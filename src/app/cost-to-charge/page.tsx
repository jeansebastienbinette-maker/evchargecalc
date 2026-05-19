import type { Metadata } from 'next';
import Link from 'next/link';
import vehicles from '@/data/vehicles.json';
import locations from '@/data/locations.json';
import { calculateCosts, formatCurrency } from '@/lib/calculations';

export const metadata: Metadata = {
  title: 'EV Charging Cost by Vehicle and State (2026)',
  description: 'Find exact EV charging costs for any vehicle in any U.S. state. 2,550+ pages with home, public, and DC fast charging costs for every vehicle × state combination.',
  alternates: { canonical: 'https://evchargecalc.com/cost-to-charge' },
};

export default function CostToChargeIndex() {
  const nationalAvgRate = 0.17;

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <span>Cost to Charge</span>
      </div>

      <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        EV Charging Cost by Vehicle and State
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, maxWidth: 700 }}>
        Find exact home, public, and DC fast charging costs for any EV in any U.S. state.
        Browse by vehicle or by state — 2,550+ detailed pages.
      </p>

      {/* Browse by vehicle */}
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.3px' }}>Browse by Vehicle</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginBottom: 56 }}>
        {vehicles.map(v => {
          const costs = calculateCosts(v.efficiency_mi_per_kwh, v.battery_kwh, nationalAvgRate, 3.50, 1000, 28, 0.49, v.dc_charge_speed_kw);
          return (
            <Link key={v.slug} href={`/vehicles/${v.slug}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px', textDecoration: 'none', color: 'var(--text)', display: 'block' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{v.brand} {v.model}</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 10 }}>{v.year} · {v.battery_kwh} kWh · {v.range_mi} mi range</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 16, fontWeight: 700, color: 'var(--green)' }}>{formatCurrency(costs.monthlyHomeCost, 0)}/mo</span>
                <span style={{ fontSize: 12, color: 'var(--accent)' }}>All 51 states →</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Browse by state */}
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.3px' }}>Browse by State</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
        {locations.map(l => (
          <Link key={l.slug} href={`/states/${l.slug}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', textDecoration: 'none', color: 'var(--text)', display: 'block' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{l.name}</div>
            <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 14, color: 'var(--accent)' }}>${l.electricity_rate.toFixed(2)}/kWh</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
