import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import vehicles from '@/data/vehicles.json';
import locations from '@/data/locations.json';
import { calculateCosts, formatCurrency, formatCurrencyPrecise } from '@/lib/calculations';

export async function generateStaticParams() {
  return vehicles.map(v => ({ 'vehicle-slug': v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ 'vehicle-slug': string }> }): Promise<Metadata> {
  const { 'vehicle-slug': vehicleSlug } = await params;
  const vehicle = vehicles.find(v => v.slug === vehicleSlug);
  if (!vehicle) return {};
  return {
    title: `Cost to Charge ${vehicle.brand} ${vehicle.model} — All 50 States (2026)`,
    description: `See exact charging costs for the ${vehicle.year} ${vehicle.brand} ${vehicle.model} in all 50 U.S. states. Home, public L2, and DC fast charging costs with annual savings vs. gas.`,
    alternates: { canonical: `https://evchargecalc.com/vehicles/${vehicleSlug}` },
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ 'vehicle-slug': string }> }) {
  const { 'vehicle-slug': vehicleSlug } = await params;
  const vehicle = vehicles.find(v => v.slug === vehicleSlug);
  if (!vehicle) notFound();

  const rows = locations.map(l => {
    const c = calculateCosts(vehicle.efficiency_mi_per_kwh, vehicle.battery_kwh, l.electricity_rate, l.gas_price, 1000, 28, 0.49, vehicle.dc_charge_speed_kw);
    return { location: l, costs: c };
  });

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/cost-to-charge" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Cost to Charge</Link>
        <span>›</span>
        <span>{vehicle.brand} {vehicle.model}</span>
      </div>

      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 12, background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        Cost to Charge {vehicle.brand} {vehicle.model} — All 50 States
      </h1>
      <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 32 }}>
        {vehicle.year} · {vehicle.battery_kwh} kWh battery · {vehicle.range_mi} mi EPA range · {vehicle.efficiency_mi_per_kwh} mi/kWh efficiency
      </p>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
          <div>State</div><div>$/kWh</div><div>$/month (home)</div><div>Annual Savings</div>
        </div>
        {rows.map(({ location, costs }) => (
          <Link key={location.slug} href={`/cost-to-charge/${vehicle.slug}-in-${location.slug}`} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14, textDecoration: 'none', color: 'var(--text)' }}>
            <div style={{ fontWeight: 600 }}>{location.name}</div>
            <div style={{ fontFamily: 'var(--font-space-mono), monospace' }}>${location.electricity_rate.toFixed(2)}</div>
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
