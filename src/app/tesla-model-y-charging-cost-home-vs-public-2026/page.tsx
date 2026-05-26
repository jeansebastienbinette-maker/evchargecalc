import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tesla Model Y Charging Cost: Home vs Public 2026',
  description: 'Exact 2026 costs to charge a Tesla Model Y at home vs Supercharger vs Electrify America vs EVgo. Per-mile, per-month, and full-charge breakdowns.',
  alternates: { canonical: 'https://evchargecalc.com/tesla-model-y-charging-cost-home-vs-public-2026' },
};

export default function TeslaModelYChargingCostPage() {
  const networks = [
    {
      name: 'Home (Level 2)',
      rate: '$0.17/kWh avg',
      perMile: '$0.041',
      fullCharge: '$13.43',
      monthly1000: '$41',
      color: 'var(--green)',
      note: 'National avg 2026. Varies $0.11 (Louisiana) to $0.40+ (Hawaii).',
    },
    {
      name: 'Tesla Supercharger',
      rate: '$0.25–$0.55/kWh',
      perMile: '$0.061–$0.134',
      fullCharge: '$19.75–$43.45',
      monthly1000: '$61–$134',
      color: 'var(--accent)',
      note: 'Avg ~$0.38/kWh nationally. No membership discount since May 2025.',
    },
    {
      name: 'Electrify America (Pass+)',
      rate: '$0.36–$0.56/kWh',
      perMile: '$0.088–$0.137',
      fullCharge: '$28.44–$44.24',
      monthly1000: '$88–$137',
      color: 'var(--text-muted)',
      note: 'Pass+ membership $4/mo. Without membership: up to $0.60/kWh.',
    },
    {
      name: 'EVgo',
      rate: '$0.33–$0.54/kWh',
      perMile: '$0.080–$0.132',
      fullCharge: '$26.07–$42.66',
      monthly1000: '$80–$132',
      color: 'var(--text-muted)',
      note: 'EVgo+ plan ($6.99/mo) lowers to ~$0.27/kWh at some locations.',
    },
    {
      name: 'ChargePoint (DCFC)',
      rate: '$0.28–$0.52/kWh',
      perMile: '$0.068–$0.127',
      fullCharge: '$22.12–$41.08',
      monthly1000: '$68–$127',
      color: 'var(--text-muted)',
      note: 'Prices set by station hosts. No consistent network rate.',
    },
    {
      name: 'Blink (DCFC)',
      rate: '$0.39–$0.79/kWh',
      perMile: '$0.095–$0.193',
      fullCharge: '$30.81–$62.41',
      monthly1000: '$95–$193',
      color: 'var(--red)',
      note: 'Among the most expensive networks. Avoid unless no other option.',
    },
  ];

  const stateExamples = [
    { state: 'Louisiana', rate: '$0.11/kWh', monthly: '$27', annual: '$321' },
    { state: 'Texas', rate: '$0.14/kWh', monthly: '$34', annual: '$410' },
    { state: 'National avg', rate: '$0.17/kWh', monthly: '$41', annual: '$497' },
    { state: 'Colorado', rate: '$0.15/kWh', monthly: '$37', annual: '$439' },
    { state: 'New York', rate: '$0.23/kWh', monthly: '$56', annual: '$672' },
    { state: 'California', rate: '$0.31/kWh', monthly: '$76', annual: '$907' },
    { state: 'Hawaii', rate: '$0.40/kWh', monthly: '$98', annual: '$1,171' },
  ];

  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>

      {/* Breadcrumb */}
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
        <span>›</span>
        <span>Tesla Model Y Charging Cost 2026</span>
      </div>

      {/* Badge */}
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>
        Cost Guide
      </div>

      {/* H1 */}
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        How Much Does It Cost to Charge a Tesla Model Y at Home vs Public Stations in 2026?
      </h1>

      {/* Lead */}
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7 }}>
        Home charging a Tesla Model Y costs around <strong style={{ color: 'var(--green)' }}>$0.041 per mile</strong> at the 2026 national average electricity rate. Pull up to a Supercharger and that same mile costs <strong style={{ color: 'var(--red)' }}>$0.093 or more</strong>. Here are the exact numbers — full charge costs, monthly bills, and per-mile breakdowns across every major charging option.
      </p>

      {/* AdSense */}
      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      {/* Section 1: Vehicle specs */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          The 2025–2026 Tesla Model Y: Specs That Matter for Charging
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
            The 2025 Model Y Long Range AWD ships with a <strong>79 kWh usable battery</strong> — a bump from the 75 kWh pack in earlier models. Its EPA efficiency rating of <strong>4.1 miles per kWh</strong> (roughly 244 Wh/mile) makes it one of the most efficient midsize SUVs on the market.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Those two numbers — 79 kWh and 4.1 mi/kWh — are what drive every cost calculation below. A full charge from near-empty to 100% requires about 83–85 kWh at the wall (accounting for ~5–7% charging losses). For the math here, we use 79 kWh as the delivered energy.
          </p>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
            <div>Spec</div><div>Value</div>
          </div>
          {[
            { spec: 'Usable battery capacity', value: '79 kWh' },
            { spec: 'EPA range (Long Range AWD)', value: '320 miles' },
            { spec: 'EPA efficiency', value: '4.1 mi/kWh (244 Wh/mi)' },
            { spec: 'On-board AC charger', value: '11.5 kW (Level 2)' },
            { spec: 'Max DC fast charge rate', value: '250 kW (V3 Supercharger)' },
            { spec: 'Time for 10→80% at V3 Supercharger', value: '~25 minutes' },
          ].map(row => (
            <div key={row.spec} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '13px 20px', borderTop: '1px solid var(--border)', fontSize: 14 }}>
              <div style={{ color: 'var(--text-muted)' }}>{row.spec}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontWeight: 600 }}>{row.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Home charging */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          Home Charging: The Cheapest Option by Far
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            The U.S. Energy Information Administration forecasts the national average residential electricity rate at <strong>$0.169/kWh in 2026</strong> — up modestly from $0.163/kWh in 2024 as grid infrastructure costs continue rising. For this guide, we use <strong>$0.17/kWh</strong> as the working average.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            At that rate, a full 79 kWh charge costs <strong style={{ color: 'var(--green)' }}>$13.43</strong>. For a driver covering 1,000 miles per month, home charging adds about <strong style={{ color: 'var(--green)' }}>$41 to the electricity bill</strong>. That&apos;s less than most people spend on a single tank of gas.
          </p>
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 12, fontWeight: 600 }}>Monthly home charging cost by state (1,000 miles/month)</p>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
            <div>State</div><div>Rate/kWh</div><div>Monthly</div><div>Annual</div>
          </div>
          {stateExamples.map(row => (
            <div key={row.state} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '13px 20px', borderTop: '1px solid var(--border)', fontSize: 14, fontWeight: row.state === 'National avg' ? 700 : 400 }}>
              <div>{row.state}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: 'var(--accent)' }}>{row.rate}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: 'var(--green)' }}>{row.monthly}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace' }}>{row.annual}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            <strong>Level 1 vs Level 2 at home:</strong> Both cost the same per kWh — the difference is speed. A standard 120V outlet (Level 1) adds about 3–4 miles of range per hour. A 240V Level 2 charger (like a NEMA 14-50 outlet or dedicated EVSE) adds 20–30 miles per hour and charges the Model Y overnight from near-empty. For most homeowners, a Level 2 setup is worth the one-time installation cost of $200–$800. See our <Link href="/home-ev-charger-installation-guide-2026" style={{ color: 'var(--accent)', textDecoration: 'none' }}>home EV charger installation guide</Link> for details.
          </p>
        </div>
      </section>

      {/* Section 3: Supercharger */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          Tesla Supercharger Costs in 2026
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            Tesla Supercharger pricing ranges from <strong>$0.25 to $0.55/kWh</strong> across the U.S., with a national average of around <strong>$0.38/kWh</strong> as of 2026. Location drives the biggest price differences — rural Midwest stations often run $0.25–$0.30/kWh, while California and New York average $0.44–$0.56/kWh. Time-of-use pricing at busy urban stations can push rates even higher during peak hours.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            At the $0.38/kWh national average, a full charge costs <strong>$30.02</strong> and a 1,000-mile month at the Supercharger would run <strong>$92.68</strong> — more than double the home charging bill.
          </p>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>⚠️ Supercharger Membership Change (May 2025)</p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            Tesla restructured its Supercharger membership in May 2025. The $10.99/month plan (down from $12.99) no longer includes per-kWh charging discounts. It now only covers priority access and hotel/restaurant partner discounts. For most Model Y owners who primarily charge at home, the membership math no longer works. Tesla owners pay the same standard per-kWh rates as everyone else at Superchargers.
          </p>
        </div>
      </section>

      {/* AdSense mid-article */}
      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      {/* Section 4: Other networks */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          Electrify America, EVgo, ChargePoint: What They Actually Cost
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            Public DC fast charging prices have risen about <strong>25% since 2022</strong> as networks push toward profitability. The era of subsidized free charging at retail locations and dealerships is largely over in 2026. What you pay now reflects the true cost of maintaining high-speed infrastructure.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <strong>Electrify America</strong> has raised its prices three times since 2022. Pass members (no subscription) now pay <strong>$0.48–$0.60/kWh</strong>. The Pass+ membership at $4/month brings that down to <strong>$0.36–$0.56/kWh</strong> — still significantly above home rates but worth it if you road trip frequently.
          </p>
        </div>
      </section>

      {/* Section 5: Full comparison table */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          Full Comparison: Every Charging Option for the Model Y in 2026
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)', gap: 4 }}>
            <div>Network</div>
            <div>Rate/kWh</div>
            <div>Per mile</div>
            <div>Full charge</div>
            <div>1,000 mi/mo</div>
          </div>
          {networks.map(n => (
            <div key={n.name} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 13, gap: 4, alignItems: 'start' }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{n.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5 }}>{n.note}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: n.color, fontWeight: 700 }}>{n.rate}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: n.color }}>{n.perMile}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace' }}>{n.fullCharge}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: n.color }}>{n.monthly1000}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>
          Based on 2025–2026 network pricing, 2025 Model Y LR (79 kWh / 4.1 mi/kWh / 320 mi EPA), 1,000 miles/month assumption. Full charge calculated at 79 kWh. Actual costs vary by location, time of use, and network membership status.
        </p>
      </section>

      {/* Section 6: When to use each */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          When to Use Each Charging Option
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            {
              title: 'Home charging (Level 2)',
              badge: 'Best for daily use',
              badgeColor: 'var(--green)',
              body: 'If you have a garage or dedicated parking spot, home Level 2 charging is the answer for 90%+ of your charging needs. Plug in every night, wake up with a full battery, and the fuel cost is a fraction of any public option. The $200–$800 one-time setup cost pays for itself within a few months versus relying on public charging.',
            },
            {
              title: 'Tesla Supercharger',
              badge: 'Best for road trips',
              badgeColor: 'var(--accent)',
              body: 'The Supercharger network remains the most convenient and often the cheapest public fast-charge option — especially in rural areas where other networks have sparse coverage. With the V3 network delivering 250 kW, you can add 150+ miles in under 15 minutes. Use it on road trips, not as a daily crutch.',
            },
            {
              title: 'Electrify America / EVgo / ChargePoint',
              badge: 'Use when Supercharger unavailable',
              badgeColor: 'var(--text-dim)',
              body: 'These networks fill coverage gaps and are useful when you need a charge away from home and there\'s no Supercharger nearby. Electrify America offers some of the fastest chargers (up to 350 kW) and benefits certain Hyundai/Kia/VW owners with included credits. EVgo\'s Pass+ plan at $6.99/month can reduce costs for frequent users.',
            },
            {
              title: 'Blink',
              badge: 'Avoid if possible',
              badgeColor: 'var(--red)',
              body: 'Blink consistently prices at the high end of the market — up to $0.79/kWh at some locations in 2026. Their Level 2 stations are fine for slow top-ups in parking garages, but their DCFC rates make them a last resort. Check PlugShare for local pricing before committing.',
            },
          ].map(item => (
            <div key={item.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{item.title}</h3>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: item.badgeColor, border: `1px solid ${item.badgeColor}`, borderRadius: 6, padding: '2px 8px' }}>{item.badge}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Off-peak savings */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          Off-Peak Charging: Cut Your Home Bill by 30–50%
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            Many utilities offer time-of-use (TOU) rates where overnight electricity (typically 9 PM – 6 AM) costs 30–50% less than peak daytime rates. In California, for example, overnight off-peak rates can drop to $0.19–$0.23/kWh even though the daytime average is $0.31/kWh.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            The Tesla app lets you schedule charging to start automatically at off-peak hours. Set it once and the car handles the rest. In states with aggressive TOU pricing, this single habit can save $15–$30/month on your electricity bill. See our <Link href="/ev-charging-off-peak-savings-2026" style={{ color: 'var(--accent)', textDecoration: 'none' }}>off-peak charging savings guide</Link> to find the best rates in your state.
          </p>
        </div>
      </section>

      {/* Section 8: Annual savings */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          What You Save in a Year: Home vs Always Supercharging
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
            <div>Scenario (12,000 mi/year)</div>
            <div>Annual cost</div>
            <div>vs. Home</div>
          </div>
          {[
            { scenario: 'Home charging (avg $0.17/kWh)', cost: '$497', diff: '—', diffColor: 'var(--green)' },
            { scenario: 'Home + off-peak discount (–35%)', cost: '$323', diff: '−$174', diffColor: 'var(--green)' },
            { scenario: 'Supercharger avg ($0.38/kWh)', cost: '$1,112', diff: '+$615', diffColor: 'var(--red)' },
            { scenario: 'Electrify America Pass+ ($0.46/kWh avg)', cost: '$1,346', diff: '+$849', diffColor: 'var(--red)' },
            { scenario: 'Gas car (28 MPG @ $3.60/gal)', cost: '$1,543', diff: '+$1,046', diffColor: 'var(--red)' },
          ].map((row, i) => (
            <div key={row.scenario} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14, fontWeight: i === 0 ? 700 : 400 }}>
              <div style={{ color: 'var(--text-muted)' }}>{row.scenario}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace' }}>{row.cost}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: row.diffColor }}>{row.diff}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>
          Based on 12,000 miles/year and 2026 national averages. A Model Y&apos;s home charging cost is 68% less than always using a Supercharger, and 68% less than driving a comparable 28 MPG gasoline vehicle. See our <Link href="/ev-vs-gas-cost-comparison-2026" style={{ color: 'var(--accent)', textDecoration: 'none' }}>EV vs gas total cost comparison</Link> for the full 5-year ownership analysis.
        </p>
      </section>

      {/* Section 9: Key takeaways */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          The Bottom Line
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            The Model Y is a cheap car to fuel — but only if you charge it at home. At the 2026 national average of $0.17/kWh, you&apos;re paying <strong>$41/month</strong> to drive 1,000 miles. Switch to regular Supercharging and that number triples to <strong>$93/month</strong>. Use a higher-priced network like Electrify America without a membership and you&apos;re approaching what a gasoline car would cost.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            The practical strategy for most Model Y owners: <strong>charge at home for daily driving</strong>, use the Supercharger network on road trips, and skip membership plans now that Tesla removed the per-kWh discount. If you do road trip heavily, Electrify America&apos;s $4/month Pass+ plan is still worth picking up.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Public charging costs have risen 25% since 2022 and analysts don&apos;t expect meaningful price drops in the next few years. Home charging is the hedge. If you&apos;re apartment-bound, check whether your building has — or is planning — Level 2 charging infrastructure before it becomes a dealbreaker.
          </p>
        </div>
      </section>

      {/* Author credit */}
      <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 32, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
        Written by <strong style={{ color: 'var(--text-muted)' }}>Jean-Sébastien Binette</strong> — Updated May 2026. Pricing data sourced from EIA Short-Term Energy Outlook (May 2025), network official pricing pages (Electrify America, EVgo, ChargePoint), InsideEVs, and Electrek. Vehicle specs from Car and Driver and Edmunds 2025 reviews.
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 12, fontSize: 15 }}>
          Get your exact cost per mile based on your state&apos;s electricity rate and your actual driving habits.
        </p>
        <Link
          href="/"
          style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}
        >
          ⚡ Use the Free Calculator
        </Link>
      </div>

    </article>
  );
}
