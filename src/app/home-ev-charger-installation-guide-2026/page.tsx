import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home EV Charger Installation: Complete 2026 Guide',
  description: 'Everything you need to know about installing a Level 2 home EV charger in 2026: costs, permits, electrician tips, tax credits, and the best EVSE units.',
  alternates: { canonical: 'https://evchargecalc.com/home-ev-charger-installation-guide-2026' },
};

export default function HomeChargerPage() {
  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
        <span>›</span>
        <span>Home Charger Installation</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>Guide</div>
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        Home EV Charger Installation: Complete 2026 Guide
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7 }}>
        A Level 2 home charger is the single best upgrade for EV ownership. Here&apos;s everything you need to know about cost, installation, and tax credits.
      </p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      {[
        {
          h2: 'Level 1 vs Level 2: What\'s the Difference?',
          body: 'Level 1 uses a standard 120V outlet and adds 3–5 miles of range per hour — fine for PHEVs but slow for full EVs. Level 2 uses a 240V circuit and adds 25–40 miles per hour, fully charging most EVs overnight. For any EV driver covering more than 30 miles/day, Level 2 is essential.'
        },
        {
          h2: 'Total Cost of a Level 2 Home Charger in 2026',
          body: 'Hardware: $300–$800 for a quality EVSE unit (ChargePoint Home Flex, Wallbox Pulsar Plus, Grizzl-E, JuiceBox). Electrical work: $200–$1,000 depending on panel distance and permit requirements. Total installed cost typically runs $500–$1,800. In most homes, the job takes 2–4 hours for a licensed electrician.'
        },
        {
          h2: 'The 30C Federal Tax Credit (2026)',
          body: 'Under the Inflation Reduction Act, the 30C Alternative Fuel Infrastructure Tax Credit covers 30% of the cost of home EV charger installation, up to $1,000 per property. This applies to hardware AND installation labor. File IRS Form 8911 with your tax return. The credit applies to installs through 2032.'
        },
        {
          h2: 'Permits and Electrical Requirements',
          body: 'Most jurisdictions require a permit for 240V electrical work. Your electrician handles this. Requirements: a dedicated 240V/50A circuit, proper gauge wire (typically 6 AWG for 50A), and GFCI protection for outdoor installations. Some utilities require notification of EV charger installation to qualify for EV rate plans.'
        },
        {
          h2: 'Best Level 2 Chargers in 2026',
          body: 'ChargePoint Home Flex: Adjustable 16–50A, WiFi, app control — $649. Wallbox Pulsar Plus: Compact, 48A, load balancing — $649. Grizzl-E: Ultra-durable, weatherproof, 40A — $279. JuiceBox 48: 48A, smart scheduling, NEMA 14-50 or hardwired — $649. Lectron: Budget pick, 48A, no WiFi — $279.'
        },
      ].map(s => (
        <section key={s.h2} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{s.h2}</h2>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>{s.body}</p>
          </div>
        </section>
      ))}

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Top Level 2 Chargers — Check Amazon Prices</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            {
              name: 'ChargePoint Home Flex',
              desc: 'Adjustable 16–50A output, WiFi, app control, works with any EV. The most flexible home charger on the market.',
              url: 'https://www.amazon.com/dp/B09GY22GV9?tag=evchargecalc2-20',
            },
            {
              name: 'Tesla Wall Connector',
              desc: '48A, sleek design, Wi-Fi connected. Best option for Tesla owners; also compatible with non-Tesla EVs via J1772 adapter.',
              url: 'https://www.amazon.com/dp/B0CRWGKJXR?tag=evchargecalc2-20',
            },
            {
              name: 'Emporia EV Charger',
              desc: '48A smart charger with real-time energy monitoring. Best value for smart home integration and time-of-use scheduling.',
              url: 'https://www.amazon.com/dp/B0D1NKXCK3?tag=evchargecalc2-20',
            },
            {
              name: 'Grizzl-E Classic',
              desc: '40A, ultra-durable NEMA 14-50, built for harsh weather. Best pick for garages and outdoor installs on a budget.',
              url: 'https://www.amazon.com/dp/B08GSCRLQB?tag=evchargecalc2-20',
            },
          ].map(p => (
            <div key={p.name} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{p.name}</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, flex: 1 }}>{p.desc}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener sponsored"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', borderTop: '1px solid var(--border)', paddingTop: 12 }}
              >
                Check Price on Amazon →
              </a>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 12 }}>
          As an Amazon Associate, evchargecalc.com earns from qualifying purchases.
        </p>
      </section>

      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          ⚡ Calculate Your Home Charging Cost
        </Link>
      </div>
    </article>
  );
}
