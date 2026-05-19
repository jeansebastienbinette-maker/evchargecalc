import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solar + EV Charging: How to Drive for Nearly Free (2026)',
  description: 'Combine home solar panels with EV charging to achieve effective rates of $0.03–$0.05/kWh. The math on solar + EV savings in 2026.',
  alternates: { canonical: 'https://evchargecalc.com/solar-ev-charging-savings-2026' },
};

export default function SolarEVPage() {
  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>Solar</div>
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        Solar + EV Charging: How to Drive for Nearly Free
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7 }}>
        A home solar system paired with an EV can reduce your effective charging cost to $0.03–$0.05/kWh — less than 1¢ per mile. Here&apos;s the math.
      </p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      {[
        { h2: 'The Solar + EV Math', body: 'A typical 6 kW solar system in a sunny state produces about 8,000–10,000 kWh/year. A Tesla Model Y driving 15,000 miles/year consumes about 4,300 kWh. Your solar system can cover 100% of EV charging and still have surplus. After federal tax credits (30% ITC), a 6 kW system costs about $12,000–$16,000 installed — typically 6–9 year payback when including both electricity and EV savings.' },
        { h2: 'Effective Cost Per kWh with Solar', body: 'If your solar system costs $15,000 after incentives and lasts 25 years, producing 200,000 kWh total, your effective generation cost is $0.075/kWh. When displacing $0.20/kWh grid power, your net effective charging cost drops to near zero. Add net metering credits and the math gets even better.' },
        { h2: 'Best States for Solar + EV Savings', body: 'California, Arizona, Texas, and Florida offer the best solar production plus relatively high grid electricity costs — maximizing the value of self-generation. California drivers can achieve effective EV charging costs under $0.03/kWh combining solar production value and avoided high-cost grid electricity.' },
        { h2: 'Solar + Battery Storage', body: 'Adding a home battery (Tesla Powerwall, Enphase IQ, LG RESU) lets you store solar energy for overnight EV charging. At $8,000–$12,000 installed, batteries add 5–8 years to payback but enable true energy independence and protect against grid outages.' },
      ].map(s => (
        <section key={s.h2} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{s.h2}</h2>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>{s.body}</p>
          </div>
        </section>
      ))}

      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          ⚡ Calculate Your Current Charging Cost
        </Link>
      </div>
    </article>
  );
}
