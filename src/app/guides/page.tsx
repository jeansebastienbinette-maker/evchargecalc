import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EV Charging Guides & Resources (2026)',
  description: 'In-depth guides on EV charging costs, savings strategies, home charger installation, DC fast charging, and state-by-state comparisons.',
  alternates: { canonical: 'https://evchargecalc.com/guides' },
};

const guides = [
  { href: '/ev-vs-gas-cost-comparison-2026', tag: 'Comparison', title: 'EV vs Gas: The Real Cost Comparison in 2026', desc: 'Total cost of ownership: fuel, maintenance, insurance, and depreciation compared side by side.' },
  { href: '/ev-charging-cost-by-state-2026', tag: 'State Data', title: 'EV Charging Cost by State: All 50 States Ranked', desc: 'Interactive table ranking all 50 states by electricity cost and EV charging affordability.' },
  { href: '/home-ev-charger-installation-guide-2026', tag: 'Guide', title: 'Home EV Charger Installation: Complete 2026 Guide', desc: 'Level 2 charger hardware, installation costs, permits, and available tax credits.' },
  { href: '/ev-charging-off-peak-savings-2026', tag: 'Savings', title: 'Off-Peak EV Charging: Save 30–50% on Your Electric Bill', desc: 'Time-of-use rates, smart charging schedules, and utility EV programs across all states.' },
  { href: '/dc-fast-charging-cost-guide-2026', tag: 'Guide', title: 'DC Fast Charging Costs: Network Comparison 2026', desc: 'Tesla Supercharger, Electrify America, ChargePoint, and EVgo pricing compared.' },
  { href: '/ev-road-trip-charging-cost-calculator-2026', tag: 'Calculator', title: 'EV Road Trip Charging Cost Calculator', desc: 'Plan your next EV road trip — estimate charging stops, time, and total cost.' },
  { href: '/solar-ev-charging-savings-2026', tag: 'Solar', title: 'Solar + EV Charging: How to Drive for Nearly Free', desc: 'Combining home solar panels with EV charging to achieve $0.03–$0.05/kWh.' },
  { href: '/ev-tax-credits-incentives-2026', tag: 'Incentives', title: 'EV Tax Credits & Charger Incentives in 2026', desc: 'Federal 30C charger credit, Inflation Reduction Act EV credits, and state-level rebates.' },
];

export default function GuidesPage() {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 12, background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        EV Charging Guides & Resources
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, maxWidth: 640 }}>
        Deep dives into EV charging costs, savings strategies, and everything you need to know about powering your electric vehicle in 2026.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {guides.map(g => (
          <Link key={g.href} href={g.href} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textDecoration: 'none', color: 'var(--text)', display: 'block' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 10 }}>{g.tag}</div>
            <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{g.title}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{g.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
