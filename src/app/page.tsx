import type { Metadata } from 'next';
import Link from 'next/link';
import Calculator from '@/components/Calculator';

export const metadata: Metadata = {
  title: 'EV Charging Cost Calculator 2026 — Home vs Public vs DC Fast Charging',
  description: 'Calculate your real EV charging cost per mile, per month, and per year. Compare home charging vs public vs DC fast charging across all 50 states. Free instant results.',
  alternates: { canonical: 'https://evchargecalc.com/' },
  openGraph: { title: 'EV Charging Cost Calculator 2026', description: 'Calculate your real EV charging cost — home vs public vs DC fast. Compare across all 50 states.', url: 'https://evchargecalc.com/' },
};

const faqs = [
  { q: 'How much does it cost to charge an EV at home in 2026?', a: 'At the 2026 U.S. average residential rate of approximately $0.17/kWh, a full charge costs between $8 and $19 depending on battery size. A Tesla Model 3 costs around $9 per full charge, while larger trucks like the F-150 Lightning cost about $19. Most EV owners spend $35–$60 per month on home charging.' },
  { q: 'Is it cheaper to charge an EV than fill up with gas?', a: 'Yes, home EV charging is typically 60–70% cheaper than gasoline. At average 2026 rates, an EV costs about $0.04–$0.05 per mile versus $0.12–$0.16 per mile for gas. Most drivers save $800–$1,200 per year.' },
  { q: 'How much does DC fast charging cost vs. home charging?', a: 'DC fast charging in 2026 averages $0.45–$0.55 per kWh — roughly 3x the cost of home charging. A full 60 kWh charge costs $27–$33 at a fast charger versus $8–$12 at home.' },
  { q: 'What is the cheapest state to charge an EV?', a: 'States with abundant hydroelectric power offer the lowest rates: Washington, Oregon, and Idaho average around $0.10–$0.12/kWh. Plains states like North Dakota, Nebraska, and Missouri also offer rates near $0.11/kWh.' },
  { q: 'How much will an EV add to my electric bill each month?', a: 'Driving the average 1,000 miles per month adds approximately $35–$60 to your electric bill at typical 2026 rates. Off-peak or time-of-use (TOU) plans can reduce this by 30–50%.' },
  { q: 'Does charging speed affect cost?', a: 'When charging at home, Level 1 (120V) and Level 2 (240V) cost the same per kWh — the difference is only speed. However, public Level 2 chargers may cost $0.20–$0.35/kWh, and DC fast chargers cost $0.40–$0.60/kWh.' },
];

const guides = [
  { href: '/ev-vs-gas-cost-comparison-2026', tag: 'Comparison', title: 'EV vs Gas: The Real Cost Comparison in 2026', desc: 'Fuel, maintenance, insurance, and total cost of ownership side by side.' },
  { href: '/ev-charging-cost-by-state-2026', tag: 'State Data', title: 'EV Charging Cost by State: All 50 States Ranked', desc: 'Which states are cheapest to charge? Interactive table with 2026 rates.' },
  { href: '/home-ev-charger-installation-guide-2026', tag: 'Guide', title: 'Home EV Charger Installation: Complete 2026 Guide', desc: 'Level 2 charger costs, electrician tips, tax credits, and best models.' },
  { href: '/ev-charging-off-peak-savings-2026', tag: 'Savings', title: 'Off-Peak EV Charging: Save 30–50% on Your Electric Bill', desc: 'Time-of-use rates, smart scheduling, and utility EV programs.' },
  { href: '/dc-fast-charging-cost-guide-2026', tag: 'Guide', title: 'DC Fast Charging Costs: Network Comparison 2026', desc: 'Tesla Supercharger vs Electrify America vs ChargePoint vs EVgo pricing.' },
  { href: '/ev-road-trip-charging-cost-calculator-2026', tag: 'Calculator', title: 'EV Road Trip Charging Cost Calculator', desc: 'Plan your next road trip — estimate stops, time, and total charging cost.' },
  { href: '/solar-ev-charging-savings-2026', tag: 'Solar', title: 'Solar + EV Charging: How to Drive for Nearly Free', desc: 'Home solar panels + EV = $0.03–$0.05/kWh. Here\'s the math.' },
  { href: '/ev-tax-credits-incentives-2026', tag: 'Incentives', title: 'EV Tax Credits & Charger Incentives in 2026', desc: 'Federal 30C credit, state rebates, and utility programs still available.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EV Charging Cost Calculator',
  url: 'https://evchargecalc.com/',
  description: 'Calculate your real EV charging cost per mile, per month, and per year.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'var(--accent-glow)', border: '1px solid var(--accent)', borderRadius: 100, fontSize: 12, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 20 }}>
            <span style={{ fontSize: 8, animation: 'pulse-dot 2s infinite' }}>●</span> Updated May 2026 — Real U.S. Rates
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16, background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            EV Charging Cost Calculator
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 640, margin: '0 auto' }}>
            How much does it really cost to charge your EV? Home vs. public vs. DC fast — calculate your cost per mile, per month, and annual savings vs. gas.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <Calculator />

      {/* Ad slot */}
      <div className="container">
        <div style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)', borderRadius: 12, padding: 16, textAlign: 'center', margin: '0 0 32px', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />
        </div>
      </div>

      {/* Charging levels explained */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 12 }}>EV Charging Levels Explained</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: 16 }}>Your charging method is the single biggest factor in what you pay per mile.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
            {[
              { badge: 'Cheapest', badgeColor: 'var(--green)', badgeBg: 'var(--green-dim)', title: 'Level 1 — Wall Outlet', price: '$0.12–$0.20/kWh', priceColor: 'var(--green)', note: 'Same as your household electricity rate', stats: [['Speed', '3–5 miles of range/hour'], ['Best for', 'Low-mileage, overnight'], ['Cost per 100 mi', '~$3.50–$6.50'], ['Equipment', 'Free (standard outlet)']] },
              { badge: 'Best Value', badgeColor: 'var(--yellow)', badgeBg: 'var(--yellow-dim)', title: 'Level 2 — Home/Public', price: '$0.12–$0.35/kWh', priceColor: 'var(--yellow)', note: 'Home rate or public network rate', stats: [['Speed', '25–40 miles of range/hour'], ['Best for', 'Daily commuters'], ['Cost per 100 mi', '~$3.50–$10'], ['Equipment', '$300–$800 + install']] },
              { badge: 'Most Expensive', badgeColor: 'var(--red)', badgeBg: 'var(--red-dim)', title: 'Level 3 — DC Fast', price: '$0.40–$0.60/kWh', priceColor: 'var(--red)', note: 'Commercial fast-charging networks', stats: [['Speed', '100–250 miles in 30 min'], ['Best for', 'Road trips, emergencies'], ['Cost per 100 mi', '~$11–$18'], ['Equipment', 'N/A (public only)']] },
            ].map(card => (
              <div key={card.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
                <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14, background: card.badgeBg, color: card.badgeColor }}>{card.badge}</span>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
                <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 22, fontWeight: 700, marginBottom: 6, color: card.priceColor }}>{card.price}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>{card.note}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  {card.stats.map(([k, v]) => <span key={k}><strong style={{ color: 'var(--text)' }}>{k}:</strong> {v}<br /></span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Link to programmatic pages */}
          <div style={{ textAlign: 'center', padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Find exact costs for your vehicle in your state</p>
            <Link href="/cost-to-charge" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
              Browse All 2,550 Vehicle × State Pages →
            </Link>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.5px' }}>Guides & Resources</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Deep dives into EV charging costs, savings strategies, and state-by-state breakdowns.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {guides.map(g => (
              <Link key={g.href} href={g.href} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textDecoration: 'none', color: 'var(--text)', display: 'block' }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 10 }}>{g.tag}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{g.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot */}
      <div className="container">
        <div style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)', borderRadius: 12, padding: 16, textAlign: 'center', margin: '0 0 32px', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />
        </div>
      </div>

      {/* FAQ */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, letterSpacing: '-0.5px' }}>Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}

function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  'use client';
  return (
    <div>
      {faqs.map((f, i) => (
        <details key={i} style={{ border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, overflow: 'hidden', background: 'var(--bg-card)' }}>
          <summary style={{ padding: '18px 24px', fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none' }}>
            {f.q}
          </summary>
          <div style={{ padding: '0 24px 18px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
