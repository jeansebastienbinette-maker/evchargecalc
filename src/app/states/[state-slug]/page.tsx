import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import vehicles from '@/data/vehicles.json';
import locations from '@/data/locations.json';
import { calculateCosts, formatCurrency } from '@/lib/calculations';

export async function generateStaticParams() {
  return locations.map(l => ({ 'state-slug': l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ 'state-slug': string }> }): Promise<Metadata> {
  const { 'state-slug': stateSlug } = await params;
  const location = locations.find(l => l.slug === stateSlug);
  if (!location) return {};
  return {
    title: `EV Charging Costs in ${location.name} — All Vehicles (2026)`,
    description: `Find EV charging costs for all 50 electric vehicles in ${location.name}. Home charging rate: $${location.electricity_rate.toFixed(2)}/kWh. Compare costs, savings vs. gas, and DC fast charging.`,
    alternates: { canonical: `https://evchargecalc.com/states/${stateSlug}` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ 'state-slug': string }> }) {
  const { 'state-slug': stateSlug } = await params;
  const location = locations.find(l => l.slug === stateSlug);
  if (!location) notFound();

  const rows = vehicles.map(v => {
    const c = calculateCosts(v.efficiency_mi_per_kwh, v.battery_kwh, location.electricity_rate, location.gas_price, 1000, 28, 0.49, v.dc_charge_speed_kw);
    return { vehicle: v, costs: c };
  }).sort((a, b) => a.costs.monthlyHomeCost - b.costs.monthlyHomeCost);

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/cost-to-charge" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Cost to Charge</Link>
        <span>›</span>
        <span>{location.name}</span>
      </div>

      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 12, background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        EV Charging Costs in {location.name} — All Vehicles
      </h1>
      <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 32 }}>
        {location.name} electricity rate: <strong style={{ color: 'var(--accent)' }}>${location.electricity_rate.toFixed(2)}/kWh</strong> · Gas: <strong>${location.gas_price.toFixed(2)}/gallon</strong>
        {' '} · Climate: <strong>{location.climate}</strong>
      </p>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
          <div>Vehicle</div><div>Efficiency</div><div>$/month (home)</div><div>Annual Savings</div>
        </div>
        {rows.map(({ vehicle, costs }) => (
          <Link key={vehicle.slug} href={`/cost-to-charge/${vehicle.slug}-in-${location.slug}`} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14, textDecoration: 'none', color: 'var(--text)' }}>
            <div style={{ fontWeight: 600 }}>{vehicle.brand} {vehicle.model}</div>
            <div style={{ fontFamily: 'var(--font-space-mono), monospace' }}>{vehicle.efficiency_mi_per_kwh} mi/kWh</div>
            <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: 'var(--green)' }}>{formatCurrency(costs.monthlyHomeCost, 0)}</div>
            <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: costs.annualSavingsVsGas > 0 ? 'var(--green)' : 'var(--red)' }}>
              {costs.annualSavingsVsGas > 0 ? '+' : ''}{formatCurrency(costs.annualSavingsVsGas, 0)}/yr
            </div>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cost-to-charge" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14 }}>← Back to all vehicles & states</Link>
      </div>
    </div>
  );
}
