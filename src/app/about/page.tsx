import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About EVChargeCalc',
  description: 'EVChargeCalc helps EV owners calculate their real charging costs across all 50 U.S. states. Free, accurate, and updated with 2026 electricity rates.',
  alternates: { canonical: 'https://evchargecalc.com/about' },
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 760 }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-1px', marginBottom: 8, background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        About EVChargeCalc
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40 }}>
        The no-nonsense EV charging cost tool for American drivers.
      </p>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>What We Do</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          EVChargeCalc calculates your real EV charging costs based on actual U.S. Energy Information Administration (EIA) electricity rate data, AAA gas price data, and manufacturer vehicle specifications. We cover all 50 states plus D.C., and 50+ popular EV models for 2025–2026.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Why We Built This</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Too many EV cost calculators use national averages that don&apos;t reflect your state&apos;s actual electricity rates. A driver in Washington pays $0.11/kWh while someone in Hawaii pays $0.40/kWh — that&apos;s a 3.6× difference. We built EVChargeCalc to give you accurate, state-specific numbers.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Our Data Sources</h2>
        <ul style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 2, paddingLeft: 20 }}>
          <li>Electricity rates: U.S. Energy Information Administration (EIA) 2026 averages</li>
          <li>Gas prices: AAA state-by-state fuel gauge report</li>
          <li>Vehicle specs: Manufacturer specifications and EPA testing data</li>
          <li>DC fast charging rates: Network pricing surveys (Electrify America, Tesla Supercharger, ChargePoint, EVgo)</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          ⚡ Try the Calculator
        </Link>
      </div>
    </div>
  );
}
