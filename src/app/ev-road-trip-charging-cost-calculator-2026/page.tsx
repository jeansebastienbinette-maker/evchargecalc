import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EV Road Trip Charging Cost Calculator (2026)',
  description: 'Plan your EV road trip in 2026. Estimate charging stops, time at chargers, and total fuel cost. DC fast charging cost calculator for Tesla, Ford, Hyundai, and all EVs.',
  alternates: { canonical: 'https://evchargecalc.com/ev-road-trip-charging-cost-calculator-2026' },
};

export default function RoadTripPage() {
  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>Calculator</div>
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        EV Road Trip Charging Cost Guide (2026)
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7 }}>
        Planning a road trip in your EV? Here&apos;s how to estimate charging stops, costs, and time — plus the formulas to calculate it for any vehicle.
      </p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Road Trip Cost Formula</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            <strong>Total trip cost = (trip miles ÷ efficiency mi/kWh) × DC fast rate $/kWh</strong>
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Example: 500 mile trip in a Tesla Model Y (3.5 mi/kWh) at $0.45/kWh = (500 ÷ 3.5) × $0.45 = <strong style={{ color: 'var(--accent)' }}>$64</strong>
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Example Road Trip Costs by Vehicle</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
            <div>Vehicle</div><div>Efficiency</div><div>200 mi trip</div><div>500 mi trip</div>
          </div>
          {[
            { v: 'Lucid Air', eff: 4.6, cost200: (200/4.6)*0.45, cost500: (500/4.6)*0.45 },
            { v: 'Tesla Model 3', eff: 3.8, cost200: (200/3.8)*0.45, cost500: (500/3.8)*0.45 },
            { v: 'Tesla Model Y', eff: 3.5, cost200: (200/3.5)*0.45, cost500: (500/3.5)*0.45 },
            { v: 'Ford F-150 Lightning', eff: 2.1, cost200: (200/2.1)*0.45, cost500: (500/2.1)*0.45 },
            { v: 'Rivian R1T', eff: 2.5, cost200: (200/2.5)*0.45, cost500: (500/2.5)*0.45 },
          ].map(row => (
            <div key={row.v} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14 }}>
              <div style={{ fontWeight: 600 }}>{row.v}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace' }}>{row.eff} mi/kWh</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: 'var(--accent)' }}>${row.cost200.toFixed(0)}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: 'var(--accent)' }}>${row.cost500.toFixed(0)}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 10 }}>Based on $0.45/kWh average DC fast charging rate.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Road Trip Planning Tips</h2>
        {[
          { tip: 'Charge to 20% on arrival', detail: 'Charging from 20–80% is fastest on most EVs. Plan stops when you still have 15–20% range remaining.' },
          { tip: 'Use PlugShare or A Better Route Planner', detail: 'ABRP automatically routes you through charging stations based on your specific vehicle and real-time weather.' },
          { tip: 'Start full, end partial', detail: 'Begin any road trip with a full charge. For the final segment, you only need enough to reach your destination — don\'t overshoot.' },
          { tip: 'Eat while you charge', detail: 'Most 20–30 minute DC fast charging sessions align perfectly with a rest stop meal or coffee break.' },
        ].map(t => (
          <div key={t.tip} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', marginBottom: 10 }}>
            <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--accent)' }}>✓ {t.tip}</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{t.detail}</div>
          </div>
        ))}
      </section>

      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          ⚡ Calculate Your Home Charging Cost
        </Link>
      </div>
    </article>
  );
}
