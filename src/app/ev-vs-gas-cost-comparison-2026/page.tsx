import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EV vs Gas: The Real Cost Comparison in 2026',
  description: 'Complete 2026 comparison of electric vehicle vs gasoline total cost of ownership. Fuel, maintenance, insurance, and depreciation — the full picture.',
  alternates: { canonical: 'https://evchargecalc.com/ev-vs-gas-cost-comparison-2026' },
};

export default function EVvsGasPage() {
  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
        <span>›</span>
        <span>EV vs Gas</span>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>Comparison</div>
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        EV vs Gas: The Real Cost Comparison in 2026
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7 }}>
        Electric vehicles cost more upfront but less to operate. Here&apos;s the complete picture — fuel, maintenance, insurance, and total ownership cost after 5 years.
      </p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Fuel Cost: EV Wins by 60–70%</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            At the 2026 U.S. national average of $0.17/kWh, an EV costs approximately <strong style={{ color: 'var(--green)' }}>$0.04–$0.05 per mile</strong> to drive at home. A comparable 28 MPG gas car costs <strong style={{ color: 'var(--red)' }}>$0.12–$0.16 per mile</strong> at $3.50/gallon — three times more.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            For a driver covering 12,000 miles per year, this difference adds up to <strong>$700–$1,400 in annual fuel savings</strong> depending on local electricity and gas rates.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
            <div>Vehicle Example</div><div>$/mile (fuel)</div><div>Annual fuel cost</div>
          </div>
          {[
            { v: 'Tesla Model Y (EV)', cpm: 0.05, annual: 600, color: 'var(--green)' },
            { v: 'Ford Mustang Mach-E (EV)', cpm: 0.05, annual: 630, color: 'var(--green)' },
            { v: 'Honda CR-V (28 MPG)', cpm: 0.125, annual: 1500, color: 'var(--red)' },
            { v: 'Ford F-150 Gas (20 MPG)', cpm: 0.175, annual: 2100, color: 'var(--red)' },
          ].map(row => (
            <div key={row.v} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14 }}>
              <div style={{ fontWeight: 600 }}>{row.v}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: row.color }}>${row.cpm.toFixed(3)}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: row.color }}>${row.annual.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Maintenance: EV Saves ~$500–$900/Year</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            EVs have fundamentally fewer moving parts than gasoline engines. No oil changes, no transmission service, no spark plugs, and dramatically reduced brake wear thanks to regenerative braking.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <strong>Average annual maintenance costs:</strong> EVs: $400–$600 vs. Gas cars: $900–$1,500. The AAA estimates EV owners save an average of $600/year on maintenance alone.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>5-Year Total Cost of Ownership</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
            <div>Cost Category (5 years)</div><div>Tesla Model Y EV</div><div>Honda CR-V Gas</div>
          </div>
          {[
            { cat: 'Purchase price (after fed credit)', ev: '$37,490', gas: '$33,000' },
            { cat: 'Fuel (12,000 mi/year)', ev: '$3,000', gas: '$7,500' },
            { cat: 'Maintenance', ev: '$2,500', gas: '$5,500' },
            { cat: 'Insurance (avg)', ev: '$9,500', gas: '$8,500' },
            { cat: 'Total 5-Year Cost', ev: '$52,490', gas: '$54,500', bold: true },
          ].map(row => (
            <div key={row.cat} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14, fontWeight: row.bold ? 700 : 400 }}>
              <div>{row.cat}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: row.bold ? 'var(--green)' : undefined }}>{row.ev}</div>
              <div style={{ fontFamily: 'var(--font-space-mono), monospace', color: row.bold ? 'var(--red)' : undefined }}>{row.gas}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 10 }}>Estimates based on 2026 national averages. Actual savings vary by state, driving habits, and vehicle choice.</p>
      </section>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>Calculate your exact charging costs for your state and vehicle</p>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          ⚡ Use the Free Calculator
        </Link>
      </div>
    </article>
  );
}
