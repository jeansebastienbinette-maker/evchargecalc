import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EV Charging Cost Per Mile in 2026: Home vs Public',
  description: 'How much does it cost to drive an EV per mile in 2026? Compare home charging, public Level 2, and DC fast charging costs per mile vs gas.',
  alternates: { canonical: 'https://evchargecalc.com/ev-charging-cost-per-mile-2026' },
};

export default function EVChargingCostPerMile() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--gradient-start, #0a0f1e)', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Breadcrumb */}
      <nav style={{ maxWidth: 760, margin: '0 auto', padding: '24px 24px 0', fontSize: 13, color: 'var(--text-muted, rgba(255,255,255,0.4))' }}>
        <Link href="/" style={{ color: 'var(--accent, #22d3ee)', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <Link href="/guides" style={{ color: 'var(--accent, #22d3ee)', textDecoration: 'none' }}>Guides</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>EV Charging Cost Per Mile 2026</span>
      </nav>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Badge */}
        <div style={{ display: 'inline-block', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.25)', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 700, color: 'var(--accent, #22d3ee)', marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Updated June 2026
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 16, color: '#fff' }}>
          EV Charging Cost Per Mile in 2026: Home vs Public vs Fast Charging
        </h1>

        <p style={{ fontSize: 14, color: 'var(--text-muted, rgba(255,255,255,0.4))', marginBottom: 32 }}>
          By Jean-Sébastien Binette · June 2026 · 7 min read
        </p>

        {/* Lead */}
        <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
          The real question for any EV owner isn't "how much does a charge cost?" — it's <strong style={{ color: '#fff' }}>how much am I paying per mile?</strong> That number varies wildly depending on where you charge. Home charging in 2026 runs about <strong style={{ color: '#fff' }}>$0.04–$0.05 per mile</strong>. Plug into a DC fast charger and that jumps to <strong style={{ color: '#fff' }}>$0.12–$0.18 per mile</strong> — nearly matching what you'd pay to drive a gas car.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
          This guide breaks down the cost per mile for every charging scenario, shows how vehicle efficiency changes the math, and gives you the formula to calculate your own number.
        </p>

        {/* AdSense */}
        <ins className="adsbygoogle" data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" style={{ display: 'block', marginBottom: 40 }} />

        {/* Section 1 */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>The Formula: How to Calculate Cost Per Mile</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Every EV has an efficiency rating measured in <strong style={{ color: '#fff' }}>miles per kWh</strong> (or kWh per 100 miles in some markets). Combine that with the price you pay per kWh and you get your cost per mile.
        </p>

        <div style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12, padding: '20px 24px', margin: '20px 0 28px', fontFamily: 'var(--font-space-mono, monospace)', fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 2 }}>
          Cost per mile = Price per kWh ÷ Vehicle efficiency (miles/kWh)<br />
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Example: $0.16/kWh ÷ 4.0 mi/kWh = $0.040/mile</span>
        </div>

        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Most EVs sold in 2026 land between 2.5 and 4.5 miles per kWh depending on vehicle size, driving speed, and weather. A compact like the Chevy Bolt or Tesla Model 3 Standard Range sits around 3.5–4.5 mi/kWh. A full-size electric truck like the Ford F-150 Lightning or Rivian R1T gets closer to 2.0–2.5 mi/kWh.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          That efficiency gap matters enormously when you're plugging into a DC fast charger at $0.45/kWh. At 2.0 mi/kWh, that's <strong style={{ color: '#fff' }}>$0.225/mile</strong> — worse than most gas vehicles.
        </p>

        {/* Section 2 */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>Home Charging: Cheapest by Far</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          The average US residential electricity rate in 2026 is around <strong style={{ color: '#fff' }}>$0.16/kWh</strong>, though rates range from $0.10/kWh in states like Louisiana and North Dakota to over $0.30/kWh in Hawaii and parts of California. If you charge overnight on a time-of-use plan, many utilities drop to $0.08–$0.12/kWh during off-peak hours.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0 28px', fontSize: 15 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Vehicle</th>
              <th style={{ textAlign: 'left', padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Efficiency</th>
              <th style={{ textAlign: 'left', padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Home @$0.16/kWh</th>
              <th style={{ textAlign: 'left', padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Off-Peak @$0.10/kWh</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Tesla Model 3 LR', '4.2 mi/kWh', '$0.038/mi', '$0.024/mi'],
              ['Tesla Model Y', '4.0 mi/kWh', '$0.040/mi', '$0.025/mi'],
              ['Chevy Bolt EUV', '3.5 mi/kWh', '$0.046/mi', '$0.029/mi'],
              ['Hyundai Ioniq 6', '4.1 mi/kWh', '$0.039/mi', '$0.024/mi'],
              ['Tesla Model X', '2.9 mi/kWh', '$0.055/mi', '$0.034/mi'],
              ['Ford F-150 Lightning', '2.2 mi/kWh', '$0.073/mi', '$0.045/mi'],
              ['Rivian R1T', '2.0 mi/kWh', '$0.080/mi', '$0.050/mi'],
            ].map(([vehicle, eff, home, offpeak], i) => (
              <tr key={i}>
                <td style={{ padding: '11px 14px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{vehicle}</td>
                <td style={{ padding: '11px 14px', color: 'rgba(255,255,255,0.55)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{eff}</td>
                <td style={{ padding: '11px 14px', color: 'var(--green, #4ade80)', fontFamily: 'monospace', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{home}</td>
                <td style={{ padding: '11px 14px', color: 'var(--green, #4ade80)', fontFamily: 'monospace', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{offpeak}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          If you charge 90% of the time at home — which is typical for most EV owners — your blended cost per mile stays very low. Drive 12,000 miles/year in a Tesla Model Y at $0.040/mile and your annual "fuel" cost is around <strong style={{ color: '#fff' }}>$480</strong>. A comparable gas vehicle at 30 mpg and $3.50/gallon costs <strong style={{ color: '#fff' }}>$1,400/year</strong>.
        </p>

        {/* Section 3 */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>Public Level 2 Charging</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Public Level 2 chargers (ChargePoint, Blink, EVgo, Electrify America) typically charge between <strong style={{ color: '#fff' }}>$0.25 and $0.40/kWh</strong> in 2026, though some stations bill by the hour ($1.00–$2.50/hr) rather than per kWh. Billing by the hour penalizes slower cars — a vehicle that charges at 7.2 kW gets far less value than one charging at 11 kW.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          At $0.30/kWh, a Tesla Model Y (4.0 mi/kWh) costs <strong style={{ color: '#fff' }}>$0.075/mile</strong> — about double home charging. It's still cheaper than gas for most people, but the gap narrows fast.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          Some networks offer subscription plans that cut per-kWh prices by 20–40%. ChargePoint's $8/month plan, for example, lowers rates to around $0.19/kWh at ChargePoint stations. If you use public L2 regularly, a subscription usually pays for itself within 2–3 sessions per month.
        </p>

        {/* Section 4 */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>DC Fast Charging: Convenient but Costly</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          DC fast charging (50–350 kW) is where EV economics get uncomfortable. Electrify America charges <strong style={{ color: '#fff' }}>$0.48/kWh</strong> for non-members in 2026. Tesla Superchargers run $0.25–$0.50/kWh depending on location and time of day. EVgo and other networks cluster around $0.35–$0.55/kWh.
        </p>

        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '18px 22px', margin: '24px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--red, #f87171)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>⚠ Cost Reality Check</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0 }}>
            A Ford F-150 Lightning at 2.2 mi/kWh on an Electrify America charger at $0.48/kWh costs <strong style={{ color: '#fff' }}>$0.218/mile</strong> — more than many gas trucks. Road trips in large EVs on public fast charging can actually cost more than gas.
          </p>
        </div>

        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          For compact and mid-size EVs, DC fast charging is still cheaper than gas in most scenarios. A Hyundai Ioniq 6 at 4.1 mi/kWh on a $0.45/kWh fast charger costs about <strong style={{ color: '#fff' }}>$0.110/mile</strong>. A 35 mpg gas car at $3.50/gallon costs $0.100/mile — essentially identical.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          The lesson: <strong style={{ color: '#fff' }}>vehicle efficiency matters more when you're relying on public charging.</strong> A highly efficient EV stays cheap everywhere. A large electric truck is only affordable when charged at home.
        </p>

        {/* Mid-article AdSense */}
        <ins className="adsbygoogle" data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" style={{ display: 'block', marginBottom: 40 }} />

        {/* Section 5 */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>EV vs Gas: Cost Per Mile Comparison</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Here's how EV charging costs stack up against gasoline at various price points:
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0 28px', fontSize: 15 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Scenario</th>
              <th style={{ textAlign: 'right', padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Cost/Mile</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['EV — Home charging, off-peak (compact)', '$0.024–$0.035'],
              ['EV — Home charging, standard rate (compact)', '$0.038–$0.050'],
              ['EV — Home charging (electric truck)', '$0.065–$0.085'],
              ['Gas car — 35 mpg @ $3.50/gal', '$0.100'],
              ['Gas car — 28 mpg @ $3.50/gal', '$0.125'],
              ['EV — Public L2 @ $0.30/kWh (compact)', '$0.070–$0.090'],
              ['EV — DC Fast @ $0.45/kWh (compact)', '$0.100–$0.130'],
              ['EV — DC Fast @ $0.48/kWh (electric truck)', '$0.195–$0.240'],
              ['Gas car — 20 mpg @ $4.00/gal (truck)', '$0.200'],
            ].map(([scenario, cost], i) => (
              <tr key={i}>
                <td style={{ padding: '11px 14px', color: 'rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{scenario}</td>
                <td style={{ padding: '11px 14px', color: i < 3 ? 'var(--green, #4ade80)' : i >= 6 ? 'var(--red, #f87171)' : 'rgba(255,255,255,0.55)', fontFamily: 'monospace', fontWeight: 700, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{cost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          The green rows are the EV sweet spot. The red rows show where EVs lose their cost advantage — large vehicles on public fast charging. For a deeper look at the full lifetime cost comparison, see our <Link href="/ev-vs-gas-cost-comparison-2026" style={{ color: 'var(--accent, #22d3ee)' }}>EV vs gas cost comparison guide</Link>.
        </p>

        {/* Section 6 */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>How to Reduce Your Cost Per Mile</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          A few strategies that actually move the needle:
        </p>

        <div style={{ background: 'var(--bg-card, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>1. Switch to a time-of-use electricity rate</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.75 }}>Most US utilities offer time-of-use (TOU) plans where off-peak rates (typically midnight–6am) are 30–50% lower. Set your car to charge at 1am and cut your cost per mile nearly in half. See our <Link href="/ev-charging-off-peak-savings-2026" style={{ color: 'var(--accent, #22d3ee)' }}>off-peak savings guide</Link> for state-by-state breakdowns.</p>
        </div>

        <div style={{ background: 'var(--bg-card, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>2. Charge at home 90%+ of the time</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.75 }}>The simplest strategy: maximize home charging. Each public fast charge session at $0.45/kWh that you replace with a $0.12/kWh overnight charge saves roughly $0.06–$0.08/mile. Over 12,000 miles/year that's $700+ in savings.</p>
        </div>

        <div style={{ background: 'var(--bg-card, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>3. Add solar if you own your home</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.75 }}>Charging from rooftop solar drops your effective electricity cost toward $0.03–$0.05/kWh once the system is paid off. That translates to <strong style={{ color: 'rgba(255,255,255,0.75)' }}>$0.008–$0.015/mile</strong> — essentially free driving. Our <Link href="/solar-ev-charging-savings-2026" style={{ color: 'var(--accent, #22d3ee)' }}>solar EV charging savings guide</Link> walks through the ROI math.</p>
        </div>

        <div style={{ background: 'var(--bg-card, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: 12, padding: '20px 24px', marginBottom: 32 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>4. Use network memberships for public charging</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.75 }}>Electrify America's $4/month Pass+ plan cuts their rate from $0.48 to $0.36/kWh. ChargePoint's $8/month plan lowers rates similarly. If you fast charge more than 2–3 times per month, memberships pay off. Check our <Link href="/dc-fast-charging-cost-guide-2026" style={{ color: 'var(--accent, #22d3ee)' }}>DC fast charging cost guide</Link> for network-by-network pricing.</p>
        </div>

        {/* Section 7 */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>State-by-State Variation</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Your electricity rate is the single biggest variable outside your control. In Louisiana ($0.09/kWh), a Tesla Model Y costs just <strong style={{ color: '#fff' }}>$0.023/mile</strong> to charge at home. In Hawaii ($0.33/kWh), the same car costs <strong style={{ color: '#fff' }}>$0.083/mile</strong> — three and a half times more.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          States with cheap electricity where EVs make the most financial sense: Louisiana, Oklahoma, Arkansas, North Dakota, Washington, Oregon, and Idaho. States where the financial case is weaker: Hawaii, Connecticut, Massachusetts, Rhode Island, and parts of California with high tiered rates. See our full <Link href="/ev-charging-cost-by-state-2026" style={{ color: 'var(--accent, #22d3ee)' }}>EV charging cost by state breakdown</Link>.
        </p>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(59,130,246,0.07))', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 16, padding: '28px 24px', textAlign: 'center', margin: '40px 0' }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
            Calculate Your Exact Cost Per Mile
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            Enter your electricity rate and vehicle efficiency to see your precise charging cost — home, Level 2, and DC fast.
          </p>
          <Link href="/" style={{ display: 'inline-block', padding: '14px 36px', background: 'linear-gradient(135deg, #22d3ee, #3b82f6)', color: '#000', textDecoration: 'none', borderRadius: 10, fontWeight: 800, fontSize: 16 }}>
            ⚡ Use the Free Calculator
          </Link>
        </div>

        {/* FAQ */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '40px 0 20px' }}>Frequently Asked Questions</h2>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {[
            {
              q: 'What is the average cost per mile for an EV in 2026?',
              a: 'At the US average home electricity rate of $0.16/kWh, most EVs cost $0.038–$0.055 per mile to charge. Compact EVs (Tesla Model 3, Chevy Bolt, Hyundai Ioniq 6) land at the low end; large electric trucks (F-150 Lightning, Rivian R1T) land at the high end due to their lower efficiency.'
            },
            {
              q: 'Is it cheaper to drive an EV than a gas car?',
              a: 'For most drivers who primarily charge at home, yes — by a significant margin. Home-charged EVs typically cost $0.03–$0.06/mile vs $0.10–$0.15/mile for a 28–35 mpg gas car at $3.50/gallon. The gap shrinks when you rely heavily on public DC fast charging, and large electric trucks on fast chargers can actually cost more per mile than gas.'
            },
            {
              q: 'How much does it cost to drive 100 miles in an EV?',
              a: 'At home rates ($0.16/kWh): $3.80–$5.50 for a compact EV, $6.50–$8.00 for an electric truck. On a public DC fast charger ($0.45/kWh): $10–$13 for a compact EV, $18–$22 for an electric truck. Compare that to $10–$12 for a 30 mpg gas car at $3.50/gallon.'
            },
            {
              q: 'Does driving speed affect EV cost per mile?',
              a: 'Yes, significantly. Most EVs are most efficient at 55–65 mph. Above 70 mph, aerodynamic drag increases sharply and efficiency can drop 15–25%. Driving 80 mph instead of 65 mph can raise your cost per mile by $0.01–$0.02 on a compact EV and more on larger vehicles with worse aerodynamics.'
            },
            {
              q: 'What\'s the cheapest way to charge an EV?',
              a: 'Home charging on a time-of-use off-peak plan, ideally supplemented by rooftop solar. Off-peak rates in many states run $0.08–$0.12/kWh, putting cost per mile at $0.020–$0.035 for efficient EVs. Some utility programs offer even lower rates (under $0.06/kWh) specifically for EV overnight charging.'
            },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '20px 0' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* Related guides */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '48px 0 18px' }}>Related Guides</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { href: '/ev-vs-gas-cost-comparison-2026', title: 'EV vs Gas Cost Comparison 2026', sub: 'Full lifetime cost analysis including depreciation and maintenance' },
            { href: '/dc-fast-charging-cost-guide-2026', title: 'DC Fast Charging Cost Guide 2026', sub: 'Tesla Supercharger vs Electrify America vs EVgo pricing compared' },
            { href: '/ev-charging-off-peak-savings-2026', title: 'Off-Peak EV Charging Savings 2026', sub: 'How much you save charging overnight on a TOU plan' },
            { href: '/ev-charging-cost-by-state-2026', title: 'EV Charging Cost by State 2026', sub: 'Electricity rates and charging costs in all 50 states' },
          ].map(({ href, title, sub }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none', padding: '14px 18px', background: 'var(--bg-card, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: 10, display: 'block' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 3px' }}>{title}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{sub}</p>
            </Link>
          ))}
        </div>

        {/* Author */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          By <strong style={{ color: 'rgba(255,255,255,0.5)' }}>Jean-Sébastien Binette</strong> — Updated June 2026
        </p>

      </article>
    </main>
  );
}
