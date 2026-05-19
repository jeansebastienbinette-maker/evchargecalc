import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import vehicles from '@/data/vehicles.json';
import locations from '@/data/locations.json';
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

const climateContext: Record<string, string> = {
  hot: 'Hot climates can reduce EV range by 10–15% due to air conditioning load and battery thermal management. EV charging costs in hot states like Texas and Florida are generally below the national average.',
  cold: 'Cold weather reduces EV range by 20–40% as the battery heats itself and the cabin. In cold states like Minnesota and Michigan, plan for higher effective charging costs per mile in winter months.',
  moderate: 'Moderate climates provide near-optimal EV performance year-round. You can expect battery range close to EPA estimates and consistent charging costs.',
};

const vehicleContext: Record<string, string> = {
  Sedan: 'Sedans offer excellent aerodynamics and some of the best efficiency ratings in the EV market.',
  SUV: 'SUVs balance cargo space with reasonable efficiency, making them the most popular EV body style in the U.S.',
  Truck: 'Electric trucks offer impressive towing and payload but trade some efficiency for capability. Payload capacity can vary with battery configuration.',
  Hatchback: 'Hatchbacks deliver outstanding urban efficiency and are among the most cost-effective EVs to charge daily.',
  Van: 'Electric vans prioritize practicality and passenger capacity. Their larger batteries mean more range but higher charging costs per session.',
};

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

  const nationalAvgRate = 0.17;
  const rateComparison = location.electricity_rate > nationalAvgRate
    ? `above the national average of $${nationalAvgRate.toFixed(2)}/kWh`
    : location.electricity_rate < nationalAvgRate
      ? `below the national average of $${nationalAvgRate.toFixed(2)}/kWh`
      : `at the national average of $${nationalAvgRate.toFixed(2)}/kWh`;

  // Related: same vehicle, other states (pick nearby / diverse)
  const relatedStates = locations.filter(l => l.slug !== location.slug).slice(0, 5);
  // Related: same state, other vehicles (by same brand or random)
  const relatedVehicles = vehicles.filter(v => v.slug !== vehicle.slug && (v.brand === vehicle.brand || true)).slice(0, 5);

  const faqs = [
    {
      q: `How much does it cost to charge a ${vehicle.brand} ${vehicle.model} at home in ${location.name}?`,
      a: `At ${location.name}'s average residential rate of $${location.electricity_rate.toFixed(2)}/kWh, charging a ${vehicle.year} ${vehicle.brand} ${vehicle.model} at home costs approximately ${formatCurrency(costs.monthlyHomeCost, 0)}/month based on 1,000 miles of driving. A full charge costs ${formatCurrency(costs.costPerFullCharge, 2)}.`,
    },
    {
      q: `How much does it cost to fully charge a ${vehicle.brand} ${vehicle.model}?`,
      a: `A full charge of the ${vehicle.brand} ${vehicle.model}'s ${vehicle.battery_kwh} kWh battery costs ${formatCurrency(costs.costPerFullCharge, 2)} at ${location.name}'s rate of $${location.electricity_rate.toFixed(2)}/kWh. At a public DC fast charger ($0.49/kWh), that's about ${formatCurrency(vehicle.battery_kwh * 0.49, 2)}.`,
    },
    {
      q: `How long does it take to charge a ${vehicle.brand} ${vehicle.model} with DC fast charging?`,
      a: `The ${vehicle.brand} ${vehicle.model} supports up to ${vehicle.dc_charge_speed_kw} kW DC fast charging. A 10% to 80% charge takes approximately ${costs.dcFastChargeTime} minutes at peak speed (actual time varies by conditions and charge level).`,
    },
    {
      q: `Is it cheaper to charge a ${vehicle.brand} ${vehicle.model} or drive a gas car in ${location.name}?`,
      a: `Home charging the ${vehicle.brand} ${vehicle.model} in ${location.name} costs ${formatCurrencyPrecise(costs.costPerMile)}/mile. A comparable 28 MPG gas car costs ${formatCurrencyPrecise(costs.monthlyGasCost / 1000)}/mile at ${location.name}'s gas price of $${location.gas_price.toFixed(2)}/gallon. EVs save approximately ${formatCurrency(costs.annualSavingsVsGas, 0)}/year.`,
    },
    {
      q: `How much does a ${vehicle.brand} ${vehicle.model} add to your electric bill in ${location.name}?`,
      a: `Driving 1,000 miles/month in a ${vehicle.brand} ${vehicle.model} adds about ${formatCurrency(costs.monthlyHomeCost, 0)} to your monthly electric bill in ${location.name}. That's ${(100 / vehicle.efficiency_mi_per_kwh).toFixed(1)} kWh per 100 miles × $${location.electricity_rate.toFixed(2)}/kWh.`,
    },
  ];

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
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text)' }}>
            Charging a {vehicle.year} {vehicle.brand} {vehicle.model} at home in {location.name} costs approximately{' '}
            <strong style={{ color: 'var(--green)' }}>{formatCurrency(costs.monthlyHomeCost, 0)}/month</strong> — that&apos;s{' '}
            <strong style={{ color: 'var(--accent)' }}>{formatCurrencyPrecise(costs.costPerMile)}/mile</strong> and saves{' '}
            <strong style={{ color: 'var(--yellow)' }}>{formatCurrency(costs.annualSavingsVsGas, 0)}/year</strong>{' '}
            compared to a 28 MPG gas car at {location.name}&apos;s gas price of ${location.gas_price.toFixed(2)}/gallon.
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.6 }}>
            {vehicleContext[vehicle.body_type] || ''}{' '}
            {climateContext[location.climate]}
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

        {/* Section 2: Cost Breakdown Table */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
            {vehicle.brand} {vehicle.model} Charging Cost Breakdown in {location.name}
          </h2>
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

        {/* Section 3: Vehicle Specs */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
            {vehicle.year} {vehicle.brand} {vehicle.model} Specs
          </h2>
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

        {/* Section 4: State Electricity Context */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
            {location.name} Electricity Rates
          </h2>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text)', marginBottom: 12 }}>
              The average residential electricity rate in <strong>{location.name}</strong> is{' '}
              <strong style={{ color: 'var(--accent)' }}>${location.electricity_rate.toFixed(2)}/kWh</strong>, which is {rateComparison}.
              With a gas price of <strong>${location.gas_price.toFixed(2)}/gallon</strong>, {location.name} ranks as a{' '}
              {costs.annualSavingsVsGas > 1200 ? 'very favorable' : costs.annualSavingsVsGas > 600 ? 'favorable' : 'moderate'} state for EV ownership.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {climateContext[location.climate]} Your {vehicle.brand} {vehicle.model}&apos;s{' '}
              {vehicle.battery_kwh} kWh battery provides up to {vehicle.range_mi} miles of range under EPA conditions.
              Real-world range may vary by 10–30% depending on temperature, speed, and terrain.
            </p>
          </div>
        </section>

        {/* Section 5: Home vs DC Fast visual */}
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

        {/* Section 6: EV vs Gas Savings */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.3px' }}>
            EV vs Gas Savings in {location.name}
          </h2>
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

        {/* Ad slot */}
        <div style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)', borderRadius: 12, padding: 16, textAlign: 'center', margin: '0 0 32px', minHeight: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />
        </div>

        {/* Section 7: FAQ */}
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

        {/* Section 8: Related Pages */}
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

        {/* CTA back to calculator */}
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
