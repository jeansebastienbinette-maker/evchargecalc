import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s — EVChargeCalc",
    default: "EV Charging Cost Calculator 2026 — EVChargeCalc",
  },
  description: "Calculate your real EV charging cost per mile, per month, and per year. Compare home charging vs public vs DC fast charging across all 50 states.",
  metadataBase: new URL("https://evchargecalc.com"),
  openGraph: {
    siteName: "EVChargeCalc",
    images: [{ url: "/og-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-46FCCXHR3S"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-46FCCXHR3S');
        `}</Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4323376361842642"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "var(--text)" }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              ⚡
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}>
              EV<span style={{ color: "var(--accent)" }}>Charge</span>Calc
            </div>
          </Link>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Calculator</Link>
            <Link href="/cost-to-charge" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>By Vehicle & State</Link>
            <Link href="/guides" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Guides</Link>
            <Link href="/about" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 0", textAlign: "center" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 16, flexWrap: "wrap" }}>
          <Link href="/about" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14 }}>About</Link>
          <Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14 }}>Privacy Policy</Link>
          <Link href="/contact" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14 }}>Contact</Link>
          <Link href="/sitemap.xml" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14 }}>Sitemap</Link>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
          Built with publicly available electricity and fuel data. Not financial or legal advice.<br />
          Rates change frequently — verify with your utility provider for exact costs.<br />
          © 2026 EVChargeCalc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
