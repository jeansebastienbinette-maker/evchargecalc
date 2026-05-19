import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'EVChargeCalc Privacy Policy — how we collect and use your data.',
  alternates: { canonical: 'https://evchargecalc.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 760 }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-1px', marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 40 }}>Last updated: May 2026</p>

      {[
        { title: 'Information We Collect', body: 'We collect your email address if you choose to subscribe to our newsletter via the calculator email gate. We also collect anonymous usage analytics via Google Analytics to understand how visitors use our site. We do not collect personally identifiable information beyond your email address.' },
        { title: 'How We Use Your Information', body: 'Your email address is used to send you our EV charging cost newsletter and updates. We never sell your email to third parties. Analytics data is used in aggregate form to improve our site. We use Google AdSense to display ads, which may use cookies to personalize ads based on your browsing history.' },
        { title: 'Cookies', body: 'We use cookies for Google Analytics and Google AdSense. You can opt out of analytics cookies by using browser privacy settings or browser extensions. AdSense cookies can be managed at Google\'s ad settings page.' },
        { title: 'Third-Party Services', body: 'We use Beehiiv for email newsletter management, Google Analytics for site analytics, and Google AdSense for advertising. Each of these services has their own privacy policies that govern how they use data.' },
        { title: 'Contact', body: 'For privacy questions, contact us via the Contact page. We will respond within 5 business days.' },
      ].map(s => (
        <div key={s.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
