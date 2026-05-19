import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact EVChargeCalc',
  description: 'Get in touch with the EVChargeCalc team.',
  alternates: { canonical: 'https://evchargecalc.com/contact' },
};

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 640 }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-1px', marginBottom: 8, background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        Contact Us
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40 }}>
        Questions, corrections, or partnership inquiries — we&apos;re happy to hear from you.
      </p>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Email</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          For general inquiries, data corrections, or partnership requests, email us at{' '}
          <strong style={{ color: 'var(--accent)' }}>hello@evchargecalc.com</strong>.
          We typically respond within 1–2 business days.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Data & Corrections</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          If you notice an error in our electricity rates, vehicle specs, or calculations, please let us know. We strive to keep all data current with EIA and manufacturer sources.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Advertising</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          For advertising or sponsorship opportunities, contact us at{' '}
          <strong style={{ color: 'var(--accent)' }}>ads@evchargecalc.com</strong>.
        </p>
      </div>
    </div>
  );
}
