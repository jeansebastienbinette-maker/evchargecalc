import type { Metadata } from 'next';
import Link from 'next/link';
import locations from '@/data/locations.json';

export const metadata: Metadata = {
  title: 'EV Charging Cost by State: All 50 States Ranked (2026)',
  description: 'EV charging costs ranked for all 50 U.S. states plus D.C. Find the cheapest and most expensive states to charge an electric vehicle in 2026.',
  alternates: { canonical: 'https://evchargecalc.com/ev-charging-cost-by-state-2026' },
};

export default function ByStatePage() {
  const sorted = [...locations].sort((a, b) => a.electricity_rate - b.electricity_rate);
  const nationalAvg = 0.17;

  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 900 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
        <span>›</span>
        <span>By State</span>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>State Data</div>
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        EV Charging Cost by State: All 50 States Ranked (2026)
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
        Electricity rates vary by up to 4× across U.S. states. Washington pays $0.11/kWh while Hawaii pays $0.40/kWh.
        Here are all 51 jurisdictions ranked from cheapest to most expensive for EV charging.
      </p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
          <div>Rank</div><div>State</div><div>$/kWh</div><div>vs. Avg</div><div>Cost/100mi*</div>
        </div>
        {sorted.map((loc, i) => {
          const diff = ((loc.electricity_rate - nationalAvg) / nationalAvg) * 100;
          const costPer100 = (100 / 3.5) * loc.electricity_rate; // using avg 3.5 mi/kWh
          return (
            <Link key={loc.slug} href={`/states/${loc.slug}`} style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr', padding: '12px 20px', borderTop: '1px solid var(--border)', fontSize: 14, textDecoration: 'none', color: 'var(--text)' }}>
              <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-space-mono), monospace' }}>#{i + 1}</div>
              <div style={{ fontWeight: 600 }}>{loc.name}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: loc.electricity_rate <= nationalAvg ? 'var(--green)' : 'var(--red)' }}>${loc.electricity_rate.toFixed(2)}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: diff <= 0 ? 'var(--green)' : 'var(--red)' }}>{diff > 0 ? '+' : ''}{diff.toFixed(0)}%</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace' }}>${costPer100.toFixed(2)}</div>
            </Link>
          );
        })}
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 40 }}>* Cost per 100 miles based on 3.5 mi/kWh average EV efficiency. Click any state for vehicle-specific costs.</p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>Calculate exact costs for your vehicle and state</p>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          ⚡ Use the Free Calculator
        </Link>
      </div>
    </article>
  );
}
