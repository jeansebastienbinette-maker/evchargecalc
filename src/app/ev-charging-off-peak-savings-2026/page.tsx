import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Off-Peak EV Charging: Save 30–50% on Your Electric Bill (2026)',
  description: 'How to use time-of-use electricity rates, smart charging schedules, and utility EV programs to cut your EV charging costs by 30–50% in 2026.',
  alternates: { canonical: 'https://evchargecalc.com/ev-charging-off-peak-savings-2026' },
};

export default function OffPeakPage() {
  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>Savings</div>
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        Off-Peak EV Charging: Save 30–50% on Your Electric Bill
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7 }}>
        Time-of-use electricity rates let you charge your EV at night for as little as $0.06–$0.10/kWh — half the standard rate in most states.
      </p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      {[
        { h2: 'What is Time-of-Use (TOU) Pricing?', body: 'TOU rates charge different prices for electricity at different times of day. Peak hours (typically 4–9 PM on weekdays) are most expensive. Off-peak hours (11 PM–7 AM) are cheapest — often 40–60% less than peak rates. EVs are perfect for TOU plans because they charge overnight when you sleep.' },
        { h2: 'How Much Can You Save?', body: 'A Tesla Model Y driving 15,000 miles/year uses about 4,300 kWh. At PG&E\'s peak rate of $0.47/kWh that\'s $2,021/year. At their off-peak EV rate of $0.13/kWh that\'s only $559/year — a savings of $1,462. Even in states with small TOU differences, off-peak charging saves $200–$500/year.' },
        { h2: 'How to Set Up Off-Peak Charging', body: 'Step 1: Call your utility and ask about EV or TOU rate plans. Step 2: Install a smart Level 2 charger with scheduling (ChargePoint, JuiceBox, Wallbox all support this). Step 3: Set your charging schedule to start after 11 PM and finish by 6 AM. Most modern EVs also have built-in departure time scheduling in their apps.' },
        { h2: 'Utilities with the Best EV Rates (2026)', body: 'PG&E (California): EV2-A rate — $0.13/kWh off-peak. SDG&E (California): EV-TOU2 — $0.10/kWh super off-peak. Xcel Energy (Colorado, Texas): EV Accelerate at Home — $0.08/kWh overnight. Duke Energy (NC, SC): EV Rate — flat $0.12/kWh for overnight charging. Eversource (CT, MA, NH): Time-of-Use EV rate — varies.' },
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
          ⚡ Calculate Your Charging Cost
        </Link>
      </div>
    </article>
  );
}
