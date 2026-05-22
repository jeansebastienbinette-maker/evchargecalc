import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import vehicles from '@/data/vehicles.json';
import locations from '@/data/locations.json';
import stateContent from '@/data/state-content';
import vehicleContent from '@/data/vehicle-content';
import { calculateCosts, formatCurrency, formatCurrencyPrecise } from '@/lib/calculations';

type Vehicle = typeof vehicles[0];
type Location = typeof locations[0];

function parseSlug(slug: string): { vehicle: Vehicle; location: Location } | null {
  for (const loc of locations) {
    const suffix = `-in-${loc.slug}`;
    if (slug.endsWith(suffix)) {
      const vehicleSlug = slug.slice(0, -suffix.length);
      const vehicle = vehicles.find(v => v.slug === vehicleSlug);
      if (vehicle) return { vehicle, location: loc };
    }
  }
  return null;
}

export async function generateStaticParams() {
  return vehicles.flatMap(v =>
    locations.map(l => ({ slug: `${v.slug}-in-${l.slug}` }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { vehicle, location } = parsed;
  const title = `Cost to Charge ${vehicle.brand} ${vehicle.model} in ${location.name} (2026)`;
  const costs = calculateCosts(vehicle.efficiency_mi_per_kwh, vehicle.battery_kwh, location.electricity_rate, location.gas_price, 1000, 28, 0.49, vehicle.dc_charge_speed_kw);
  const desc = `Charging a ${vehicle.year} ${vehicle.brand} ${vehicle.model} at home in ${location.name} costs ${formatCurrency(costs.monthlyHomeCost, 0)}/month — that's ${formatCurrencyPrecise(costs.costPerMile)}/mile and saves ${formatCurrency(costs.annualSavingsVsGas, 0)}/year vs. gas.`;
  return {
    title,
    description: desc,
    alternates: { canonical: `https://evchargecalc.com/cost-to-charge/${slug}` },
    openGraph: { title, description: desc, url: `https://evchargecalc.com/cost-to-charge/${slug}` },
  };
}

const climateRangeNote: Record<string, string> = {
  hot: 'Hot climates can reduce EV range by 10–15% due to air conditioning load and battery thermal management. Pre-conditioning your battery while still plugged in minimizes this effect.',
  cold: 'Cold weather reduces EV range by 20–40% as the battery heats itself and the cabin. Use scheduled departure to pre-heat on shore power before driving.',
  moderate: 'Moderate climates provide near-optimal EV performance year-round. Expect battery range close to EPA estimates and consistent charging costs across seasons.',
};

const bodyTypeIntro: Record<string, string> = {
  Sedan: 'Sedans offer excellent aerodynamics and some of the highest efficiency ratings in the EV market, making them among the most cost-effective EVs to run daily.',
  SUV: 'SUVs balance cargo space with reasonable efficiency, making them the most popular EV body style in the U.S. — and this one handles that balance well.',
  Truck: 'Electric trucks offer impressive towing and payload but trade some efficiency for capability. The total cost advantage vs. a gas truck is still substantial.',
  Hatchback: 'Hatchbacks deliver outstanding urban efficiency and are among the most cost-effective EVs to charge daily — especially on shorter commutes.',
  Van: 'Electric vans prioritize practicality and passenger capacity. Their larger batteries mean more range but higher charging costs per session.',
};

type FaqItem = { q: string; a: string };

function buildFaqs(vehicle: Vehicle, location: typeof locations[0], costs: ReturnType<typeof calculateCosts>): FaqItem[] {
  const base: FaqItem[] = [
    {
      q: `How much does it cost to charge a ${vehicle.brand} ${vehicle.model} at home in ${location.name}?`,
      a: `At ${location.name}'s average residential rate of $${location.electricity_rate.toFixed(2)}/kWh, charging a ${vehicle.year} ${vehicle.brand} ${vehicle.model} at home costs approximately ${formatCurrency(costs.monthlyHomeCost, 0)}/month based on 1,000 miles of driving. A full charge costs ${formatCurrency(costs.costPerFullCharge, 2)}.`,
    },
    {
      q: `How much does it cost to fully charge a ${vehicle.brand} ${vehicle.model}?`,
      a: `A full charge of the ${vehicle.brand} ${vehicle.model}'s ${vehicle.battery_kwh} kWh battery costs ${formatCurrency(costs.costPerFullCharge, 2)} at ${location.name}'s rate of $${location.electricity_rate.toFixed(2)}/kWh. At a public DC fast charger ($0.49/kWh), that's about ${formatCurrency(vehicle.battery_kwh * 0.49, 2)}.`,
    },
    {
      q: `Is it cheaper to charge a ${vehicle.brand} ${vehicle.model} or drive a gas car in ${location.name}?`,
      a: `Home charging the ${vehicle.brand} ${vehicle.model} in ${location.name} costs ${formatCurrencyPrecise(costs.costPerMile)}/mile. A comparable 28 MPG gas car costs ${formatCurrencyPrecise(costs.monthlyGasCost / 1000)}/mile at ${location.name}'s gas price of $${location.gas_price.toFixed(2)}/gallon. EVs save approximately ${formatCurrency(costs.annualSavingsVsGas, 0)}/year.`,
    },
    {
      q: `How long does it take to charge a ${vehicle.brand} ${vehicle.model} with DC fast charging?`,
      a: `The ${vehicle.brand} ${vehicle.model} supports up to ${vehicle.dc_charge_speed_kw} kW DC fast charging. A 10–80% charge takes approximately ${costs.dcFastChargeTime} minutes at peak speed. Actual time varies by charger capacity, battery temperature, and current state of charge.`,
    },
    {
      q: `How much does a ${vehicle.brand} ${vehicle.model} add to your electric bill in ${location.name}?`,
      a: `Driving 1,000 miles/month in a ${vehicle.brand} ${vehicle.model} adds about ${formatCurrency(costs.monthlyHomeCost, 0)} to your monthly electric bill in ${location.name}. That's ${(100 / vehicle.efficiency_mi_per_kwh).toFixed(1)} kWh per 100 miles × $${location.electricity_rate.toFixed(2)}/kWh.`,
    },
  ];

  const cold: FaqItem[] = [
    {
      q: `How does cold weather in ${location.name} affect ${vehicle.brand} ${vehicle.model} range?`,
      a: `Cold winters in ${location.name} can reduce ${vehicle.brand} ${vehicle.model} range by 20–40%. With a ${vehicle.battery_kwh} kWh battery and ${vehicle.range_mi}-mile EPA range, plan for ${Math.round(vehicle.range_mi * 0.7)}–${Math.round(vehicle.range_mi * 0.8)} miles in cold conditions. Use the scheduled departure feature to pre-heat the cabin while still plugged in to preserve driving range.`,
    },
    {
      q: `What is the best way to charge a ${vehicle.brand} ${vehicle.model} during ${location.name} winters?`,
      a: `Keep the ${vehicle.brand} ${vehicle.model} plugged in when parked during ${location.name} winters — the battery management system uses grid power (not battery power) to maintain optimal temperature. Set a charging limit of 80–90% for daily use, and pre-condition the cabin 15–20 minutes before departure for maximum comfort and range.`,
    },
  ];

  const hot: FaqItem[] = [
    {
      q: `How does ${location.name}'s heat affect ${vehicle.brand} ${vehicle.model} range and battery?`,
      a: `High temperatures in ${location.name} increase air conditioning load and activate battery cooling systems, reducing effective range by 10–15%. With a ${vehicle.range_mi}-mile EPA range, expect ${Math.round(vehicle.range_mi * 0.87)}–${Math.round(vehicle.range_mi * 0.92)} miles during peak summer heat. Pre-conditioning the cabin while plugged in helps preserve battery charge for actual driving.`,
    },
    {
      q: `Is it safe to charge a ${vehicle.brand} ${vehicle.model} in ${location.name}'s summer heat?`,
      a: `Yes — the ${vehicle.brand} ${vehicle.model}'s thermal management system is designed for hot-weather operation. Avoid leaving the car with a full (100%) charge in direct sun for extended periods in peak summer heat. Daily charging to 80% is recommended for battery longevity in hot climates. Level 2 home charging during evening hours when temperatures drop is ideal.`,
    },
  ];

  const truck: FaqItem[] = [
    {
      q: `How much does towing reduce the ${vehicle.brand} ${vehicle.model}'s range in ${location.name}?`,
      a: `Towing with the ${vehicle.brand} ${vehicle.model} can reduce range by 40–60% depending on load and speed. On ${location.name}'s highways at 65 mph with a moderate trailer, plan for approximately ${Math.round(vehicle.range_mi * 0.45)}–${Math.round(vehicle.range_mi * 0.55)} miles per charge. Plan DCFC stops roughly every 100–120 miles when towing to maintain safe buffer.`,
    },
  ];

  const suv: FaqItem[] = [
    {
      q: `What is the best charging setup for a ${vehicle.brand} ${vehicle.model} in ${location.name}?`,
      a: `For a ${vehicle.brand} ${vehicle.model} owner in ${location.name}, a Level 2 home charger (at least 32A, preferably 48A) is the ideal setup. At ${location.name}'s rate of $${location.electricity_rate.toFixed(2)}/kWh, overnight home charging costs ${formatCurrency(costs.monthlyHomeCost, 0)}/month for 1,000 miles — significantly less than gas. DC fast charging at $0.49/kWh is 4–5× more expensive and best reserved for road trips.`,
    },
  ];

  let extras: FaqItem[] = [];
  if (location.climate === 'cold') extras = [...extras, ...cold];
  if (location.climate === 'hot') extras = [...extras, ...hot];
  if (vehicle.body_type === 'Truck') extras = [...extras, ...truck];
  if (vehicle.body_type === 'SUV') extras = [...extras, ...suv];

  const combined = [...base, ...extras];
  const selected = combined.slice(0, 6);
  return selected;
}

export default async function ProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { vehicle, location } = parsed;
  const costs = calculateCosts(
    vehicle.efficiency_mi_per_kwh,
    vehicle.battery_kwh,
    location.electricity_rate,
    location.gas_price,
    1000,
    28,
    0.49,
    vehicle.dc_charge_speed_kw
  );

  const sc = stateContent[location.slug];
  const vc = vehicleContent[vehicle.slug];

  const nationalAvgRate = 0.17;
  const rateComparison = location.electricity_rate > nationalAvgRate
    ? `above the national average of $${nationalAvgRate.toFixed(2)}/kWh`
    : location.electricity_rate < nationalAvgRate
      ? `below the national average of $${nationalAvgRate.toFixed(2)}/kWh`
      : `at the national average of $${nationalAvgRate.toFixed(2)}/kWh`;

  const relatedStates = locations.filter(l => l.slug !== location.slug).slice(0, 5);
  const relatedVehicles = vehicles.filter(v => v.slug !== vehicle.slug && (v.brand === vehicle.brand || true)).slice(0, 5);

  const faqs = buildFaqs(vehicle, location, costs);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Cost to Charge ${vehicle.brand} ${vehicle.model} in ${location.name} (2026)`,
    url: `https://evchargecalc.com/cost-to-charge/${slug}`,
    publisher: { '@type': 'Organization', name: 'EVChargeCalc', url: 'https://evchargecalc.com' },
    datePublished: '2026-01-01',
    dateModified: '2026-05-19',
  };

  const maxMo = Math.max(costs.monthlyHomeCost, costs.monthlyPublicL2Cost, costs.monthlyDCFastCost, costs.monthlyGasCost);
  const pct = (v: number) => Math.max(8, (v / maxMo) * 100) + '%';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 24, display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/cost-to-charge" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Cost to Charge</Link>
          <span>›</span>
          <span>{vehicle.brand} {vehicle.model} in {location.name}</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.2, marginBottom: 24, background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          How Much Does It Cost to Charge a {vehicle.brand} {vehicle.model} in {location.name}?
        </h1>

        {/* Section 1: Quick Answer */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', marginBottom: 12 }}>Quick Answer</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text)', marginBottom: 12 }}>
            Charging a {vehicle.year} {vehicle.brand} {vehicle.model} at home in {location.name} costs approximately{' '}
            <strong style={{ color: 'var(--green)' }}>{formatCurrency(costs.monthlyHomeCost, 0)}/month</strong> — that&apos;s{' '}
            <strong style={{ color: 'var(--accent)' }}>{formatCurrencyPrecise(costs.costPerMile)}/mile</strong> and saves{' '}
            <strong style={{ color: 'var(--yellow)' }}>{formatCurrency(costs.annualSavingsVsGas, 0)}/year</strong>{' '}
            compared to a 28 MPG gas car at {location.name}&apos;s gas price of ${location.gas_price.toFixed(2)}/gallon.
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {bodyTypeIntro[vehicle.body_type] || ''}{' '}
            {climateRangeNote[location.climate]}
          </p>
        </div>

        {/* Key stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Cost per Mile', value: formatCurrencyPrecise(costs.costPerMile), sub: 'home charging', color: 'var(--accent)' },
            { label: 'Monthly Cost', value: formatCurrency(costs.monthlyHomeCost, 0), sub: '1,000 miles/month', color: 'var(--green)' },
            { label: 'Annual Savings', value: formatCurrency(costs.annualSavingsVsGas, 0), sub: 'vs. 28 MPG gas car', color: 'var(--yellow)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 30, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Ad slot */}
        <div style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)', borderRadius: 12, padding: 16, textAlign: 'center', margin: '0 0 32px', minHeight: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />
        </div>

        {/* Section 2: Vehicle Overview */}
        {vc && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
              About the {vehicle.year} {vehicle.brand} {vehicle.model}
            </h2>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 16 }}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text)', marginBottom: 20 }}>{vc.overview}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Advantages</div>
                  {vc.pros.map((pro, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{pro}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Considerations</div>
                  {vc.cons.map((con, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }}>✗</span>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Ideal Buyer</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{vc.idealBuyer}</p>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--yellow)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>vs. Gas Equivalent</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{vc.gasEquivalent}</p>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Cost Breakdown Table */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.3px' }}>
            {vehicle.brand} {vehicle.model} Charging Cost Breakdown in {location.name}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
            {location.name}&apos;s electricity rate of <strong style={{ color: 'var(--accent)' }}>${location.electricity_rate.toFixed(2)}/kWh</strong> is {rateComparison}.
            At this rate, the {vehicle.brand} {vehicle.model}&apos;s {vehicle.battery_kwh} kWh battery costs{' '}
            <strong>{formatCurrency(costs.costPerFullCharge, 2)}</strong> for a full charge —{' '}
            {costs.annualSavingsVsGas > 1200 ? 'making it one of the more compelling EV economics in this state.' : 'a meaningful savings versus gas at current prices.'}
          </p>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
              <div>Charging Method</div><div>$/kWh</div><div>$/month</div><div>$/year</div>
            </div>
            {[
              { label: '🏠 Home (Level 2)', kwh: location.electricity_rate, mo: costs.monthlyHomeCost, yr: costs.annualHomeCost },
              { label: '🔌 Public Level 2', kwh: location.electricity_rate * 1.8, mo: costs.monthlyPublicL2Cost, yr: costs.annualPublicL2Cost },
              { label: '⚡ DC Fast Charger', kwh: 0.49, mo: costs.monthlyDCFastCost, yr: costs.annualDCFastCost },
              { label: '⛽ Gasoline (28 MPG)', kwh: null, mo: costs.monthlyGasCost, yr: costs.annualGasCost },
            ].map((row, i) => (
              <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14, background: i === 3 ? 'var(--bg-card-hover)' : 'transparent' }}>
                <div style={{ fontWeight: 600 }}>{row.label}</div>
                <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontWeight: 600 }}>{row.kwh !== null ? `$${row.kwh.toFixed(2)}` : `$${location.gas_price.toFixed(2)}/gal`}</div>
                <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontWeight: 600 }}>{formatCurrency(row.mo, 0)}</div>
                <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontWeight: 600 }}>{formatCurrency(row.yr, 0)}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 10, lineHeight: 1.5 }}>
            Based on 1,000 miles/month. Public L2 estimated at 1.8× home rate. DC fast charging at national average of $0.49/kWh.
          </p>
        </section>

        {/* Section 4: Vehicle Specs */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.3px' }}>
            {vehicle.year} {vehicle.brand} {vehicle.model} Specs &amp; Charging Data
          </h2>
          {vc && (
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{vc.chargingNotes}</p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Battery', value: `${vehicle.battery_kwh} kWh` },
              { label: 'EPA Range', value: `${vehicle.range_mi} miles` },
              { label: 'Efficiency', value: `${vehicle.efficiency_mi_per_kwh} mi/kWh` },
              { label: 'kWh/100 miles', value: `${costs.kwhPer100Miles.toFixed(1)} kWh` },
              { label: 'DC Fast Charge', value: `${vehicle.dc_charge_speed_kw} kW max` },
              { label: '10–80% Time', value: `~${costs.dcFastChargeTime} min` },
              { label: 'Body Type', value: vehicle.body_type },
              { label: 'MSRP', value: formatCurrency(vehicle.msrp, 0) },
              { label: 'Full Charge Cost', value: formatCurrency(costs.costPerFullCharge, 2) },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontWeight: 700, color: 'var(--text)' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: State EV Landscape */}
        {sc && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
              EV Ownership in {location.name}
            </h2>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text)', marginBottom: 16 }}>{sc.evMarket}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Incentives &amp; Programs</div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{sc.incentives}</p>
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Charging Infrastructure</div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{sc.infrastructure}</p>
                </div>
              </div>
              <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--yellow)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Grid &amp; Energy Source</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{sc.gridSource}</p>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: State Electricity & EV Savings */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
            {location.name} Electricity Rates &amp; EV Savings
          </h2>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 16 }}>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text)', marginBottom: 12 }}>
              The average residential electricity rate in <strong>{location.name}</strong> is{' '}
              <strong style={{ color: 'var(--accent)' }}>${location.electricity_rate.toFixed(2)}/kWh</strong>, which is {rateComparison}.
              With a gas price of <strong>${location.gas_price.toFixed(2)}/gallon</strong>, {location.name} ranks as a{' '}
              {costs.annualSavingsVsGas > 1200 ? 'very favorable' : costs.annualSavingsVsGas > 600 ? 'favorable' : 'moderate'} state for EV ownership.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {climateRangeNote[location.climate]} Your {vehicle.brand} {vehicle.model}&apos;s{' '}
              {vehicle.battery_kwh} kWh battery provides up to {vehicle.range_mi} miles of EPA-rated range.
              Real-world range may vary by 10–30% depending on temperature, speed, and terrain.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 8 }}>Annual EV Cost (home)</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 28, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>{formatCurrency(costs.annualHomeCost, 0)}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{vehicle.brand} {vehicle.model} @ ${location.electricity_rate.toFixed(2)}/kWh</div>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 8 }}>Annual Gas Cost (28 MPG)</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 28, fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>{formatCurrency(costs.annualGasCost, 0)}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>@ ${location.gas_price.toFixed(2)}/gallon in {location.name}</div>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.1), rgba(34,211,238,0.1))', border: '1px solid var(--green)', borderRadius: 14, padding: 24, marginTop: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>You save every year by driving electric in {location.name}</div>
            <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 36, fontWeight: 700, color: 'var(--green)' }}>{formatCurrency(costs.annualSavingsVsGas, 0)}/year</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 8 }}>That&apos;s {formatCurrency(costs.annualSavingsVsGas / 12, 0)}/month saved vs. a 28 MPG gas car</div>
          </div>
        </section>

        {/* Section 7: Home vs DC Fast visual */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
            Home vs. DC Fast Charging in {location.name}
          </h2>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 20 }}>Monthly cost comparison for 1,000 miles in a {vehicle.brand} {vehicle.model}:</p>
            {[
              { label: '🏠 Home L2', value: costs.monthlyHomeCost, color: 'linear-gradient(90deg, var(--green), #059669)' },
              { label: '🔌 Public L2', value: costs.monthlyPublicL2Cost, color: 'linear-gradient(90deg, var(--yellow), #d97706)' },
              { label: '⚡ DC Fast', value: costs.monthlyDCFastCost, color: 'linear-gradient(90deg, var(--red), #dc2626)' },
              { label: '⛽ Gasoline', value: costs.monthlyGasCost, color: 'linear-gradient(90deg, #9333ea, #7c3aed)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ width: 110, fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 }}>{row.label}</div>
                <div style={{ flex: 1, height: 36, background: 'var(--bg)', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ width: pct(row.value), height: '100%', background: row.color, borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 12, fontFamily: 'var(--font-space-mono), monospace', fontSize: 13, fontWeight: 700, color: '#fff', minWidth: 50 }}>
                    {formatCurrency(row.value, 0)}
                  </div>
                </div>
                <div style={{ width: 80, textAlign: 'right', fontFamily: 'var(--font-space-mono), monospace', fontWeight: 700, flexShrink: 0 }}>{formatCurrency(row.value, 0)}/mo</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Charging Tips */}
        {sc && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
              Tips for Charging Your {vehicle.brand} {vehicle.model} in {location.name}
            </h2>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
                {location.name}&apos;s {location.climate} climate and charging infrastructure have specific implications for {vehicle.brand} {vehicle.model} owners.
                {' '}Here are practical tips to maximize range and minimize charging costs in this state:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                {sc.chargingTips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 18px', background: 'var(--bg)', borderRadius: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Ad slot */}
        <div style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)', borderRadius: 12, padding: 16, textAlign: 'center', margin: '0 0 32px', minHeight: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />
        </div>

        {/* Section 9: FAQ */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.3px' }}>
            Frequently Asked Questions
          </h2>
          {faqs.map((f, i) => (
            <details key={i} style={{ border: '1px solid var(--border)', borderRadius: 12, marginBottom: 10, overflow: 'hidden', background: 'var(--bg-card)' }}>
              <summary style={{ padding: '16px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer', listStyle: 'none' }}>{f.q}</summary>
              <div style={{ padding: '0 20px 16px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>
              </div>
            </details>
          ))}
        </section>

        {/* Section 10: Related Pages */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.3px' }}>
            {vehicle.brand} {vehicle.model} in Other States
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 32 }}>
            {relatedStates.map(l => {
              const c = calculateCosts(vehicle.efficiency_mi_per_kwh, vehicle.battery_kwh, l.electricity_rate, l.gas_price, 1000, 28, 0.49, vehicle.dc_charge_speed_kw);
              return (
                <Link key={l.slug} href={`/cost-to-charge/${vehicle.slug}-in-${l.slug}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', textDecoration: 'none', color: 'var(--text)', display: 'block' }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{l.name}</div>
                  <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 14, color: 'var(--accent)' }}>{formatCurrency(c.monthlyHomeCost, 0)}/mo</div>
                </Link>
              );
            })}
            <Link href={`/vehicles/${vehicle.slug}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 12, padding: '14px 16px', textDecoration: 'none', color: 'var(--accent)', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 14 }}>
              All 51 states →
            </Link>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.3px' }}>
            Other EVs in {location.name}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {relatedVehicles.map(v => {
              const c = calculateCosts(v.efficiency_mi_per_kwh, v.battery_kwh, location.electricity_rate, location.gas_price, 1000, 28, 0.49, v.dc_charge_speed_kw);
              return (
                <Link key={v.slug} href={`/cost-to-charge/${v.slug}-in-${location.slug}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', textDecoration: 'none', color: 'var(--text)', display: 'block' }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{v.brand} {v.model}</div>
                  <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 14, color: 'var(--accent)' }}>{formatCurrency(c.monthlyHomeCost, 0)}/mo</div>
                </Link>
              );
            })}
            <Link href={`/states/${location.slug}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 12, padding: '14px 16px', textDecoration: 'none', color: 'var(--accent)', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 14 }}>
              All 50 EVs →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: 28, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>Want a personalized calculation based on your actual driving habits?</p>
          <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
            ⚡ Use the Free Calculator
          </Link>
        </div>
      </div>
    </>
  );
}
