import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EV Tax Credits & Charger Incentives in 2026',
  description: 'Complete guide to EV tax credits in 2026: federal 30D EV credit (up to $7,500), 30C charger credit ($1,000), state rebates, and utility incentive programs.',
  alternates: { canonical: 'https://evchargecalc.com/ev-tax-credits-incentives-2026' },
};

export default function TaxCreditsPage() {
  return (
    <article className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)', display: 'flex', gap: 8 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/guides" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guides</Link>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>Incentives</div>
      <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.2 }}>
        EV Tax Credits & Charger Incentives in 2026
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7 }}>
        Federal EV and charger tax credits remain in place for 2026. Here&apos;s exactly what&apos;s available and how to claim it.
      </p>

      <ins className="adsbygoogle" style={{ display: 'block', marginBottom: 32 }} data-ad-client="ca-pub-4323376361842642" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />

      {[
        { h2: 'Federal 30D EV Credit (Up to $7,500)', body: 'The Clean Vehicle Credit under Section 30D provides up to $7,500 for new EVs and $4,000 for used EVs. Income limits apply: $150,000 for single filers, $300,000 for joint filers for new EVs. Vehicle MSRP limits: $55,000 for cars, $80,000 for trucks/SUVs/vans. The vehicle must meet North American assembly and critical mineral/battery component requirements. As of 2024, you can apply this as a point-of-sale discount directly at the dealer.' },
        { h2: 'Federal 30C Charger Credit (Up to $1,000)', body: 'The Alternative Fuel Vehicle Refueling Property Credit covers 30% of the cost of installing a home EV charger, up to $1,000 for residential property ($100,000 for commercial/business). Covers both hardware and installation labor costs. Apply via IRS Form 8911. The credit is nonrefundable — it reduces your tax liability but not below zero.' },
        { h2: 'State EV Rebates (2026)', body: 'California: CVRP offers $2,000–$7,500 for low-income buyers. Colorado: $5,000 state tax credit on top of federal. New York: $2,000 Drive Clean Rebate. Illinois: $4,000 EV rebate. Massachusetts: $2,500 MOR-EV rebate. Oregon: $2,500 rebate. Connecticut: $7,500 CHEAPR rebate for low-income buyers. Visit your state DMV or Energy Office website for current programs.' },
        { h2: 'Utility Company EV Programs', body: 'Many utilities offer additional incentives: rebates on home charger installation ($100–$500 from Duke, Pacific Power, Xcel), reduced EV charging rates (PG&E EV2-A, SDG&E EV-TOU), and free Level 2 charger programs. Contact your utility company directly or check DSIRE (Database of State Incentives for Renewables & Efficiency) at dsireusa.org.' },
      ].map(s => (
        <section key={s.h2} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{s.h2}</h2>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>{s.body}</p>
          </div>
        </section>
      ))}

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>
          Tax credit rules can change. Consult a tax professional or the IRS website for the most current information. This guide reflects rules as of May 2026.
        </p>
      </div>

      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          ⚡ Calculate Your EV Charging Costs
        </Link>
      </div>
    </article>
  );
}
