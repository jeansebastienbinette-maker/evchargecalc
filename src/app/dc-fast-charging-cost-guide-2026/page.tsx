import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DC Fast Charging Costs: Network Comparison 2026',
  description: 'Compare DC fast charging costs across all major networks: Tesla Supercharger, Electrify America, ChargePoint, EVgo, and Blink. Find the cheapest way to fast charge your EV in 2026.',
  alternates: { canonical: 'https://evchargecalc.com/dc-fast-charging-cost-guide-2026' },
};

export default function DCFastPage() {
  const networks = [
    { name: 'Tesla Supercharger', rate: '$0.25–$0.50/kWh', speed: 'Up to 250 kW', notes: 'Members pay less. Non-Tesla vehicles pay more. Best coverage in rural areas.' },
    { name: 'Electrify America', rate: '$0.32–$0.48/kWh', speed: 'Up to 350 kW', notes: 'Pass+ membership ($4/mo) reduces cost. Hyundai/Kia/VW often get free sessions.' },
    { name: 'ChargePoint', rate: '$0.30–$0.55/kWh', speed: 'Up to 400 kW', notes: 'Prices set by individual station hosts. Largest network in North America.' },
    { name: 'EVgo', rate: '$0.35–$0.55/kWh', speed: 'Up to 350 kW', notes: 'EVgo+ membership reduces rates. Strong urban coverage.' },
    { name: 'Blink', rate: '$0.39–$0.59/kWh', speed: 'Up to 80 kW', notes: 'Slower DC fast chargers. Pricing varies widely by location.' },
  ];

  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>Guide</div>
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        DC Fast Charging Costs: Network Comparison 2026
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7 }}>
        DC fast charging costs 3–4× more than home charging. Here&apos;s how major networks compare on price, speed, and reliability in 2026.
      </p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Network Pricing Comparison</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {networks.map(n => (
            <div key={n.name} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700 }}>{n.name}</h3>
                <span style={{ fontFamily: 'var(--font-space-mono), monospace', color: 'var(--accent)', fontWeight: 700, fontSize: 15 }}>{n.rate}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}>Max speed: {n.speed}</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{n.notes}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>When to Use DC Fast Charging</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            DC fast charging is best reserved for road trips and emergencies. At $0.45–$0.55/kWh, it costs nearly as much per mile as gasoline. Daily commuters who charge at home at $0.15–$0.20/kWh are paying 3× less per mile. If you find yourself regularly relying on DC fast chargers, a home Level 2 charger will pay for itself within months.
          </p>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          ⚡ Calculate Home vs DC Fast Cost
        </Link>
      </div>
    </article>
  );
}
