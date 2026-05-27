import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Long Does It Take to Charge an EV? (2026)',
  description: 'Level 1 takes 40–80 hours. Level 2 takes 4–12 hours. DC fast charging hits 80% in 20–45 min. Full breakdown by charger type and vehicle.',
  alternates: { canonical: 'https://evchargecalc.com/how-long-does-it-take-to-charge-an-ev-2026' },
};

export default function HowLongToChargeEVPage() {
  const chargingLevels = [
    {
      level: 'Level 1 (120V)',
      power: '1.2–1.9 kW',
      milesPerHour: '3–5 miles',
      fullCharge: '40–80+ hours',
      bestFor: 'PHEVs, emergency top-up',
      color: 'var(--text-dim)',
    },
    {
      level: 'Level 2 (240V)',
      power: '7.2–19.2 kW',
      milesPerHour: '15–35 miles',
      fullCharge: '4–12 hours',
      bestFor: 'Daily home or workplace charging',
      color: 'var(--accent)',
    },
    {
      level: 'DC Fast Charge',
      power: '50–350 kW',
      milesPerHour: '100–1,000+ miles',
      fullCharge: '20–60 min (10–80%)',
      bestFor: 'Road trips, quick top-ups',
      color: 'var(--green)',
    },
  ];

  const vehicles = [
    {
      vehicle: 'Tesla Model 3 Standard Range',
      battery: '57.5 kWh',
      level1: '~48 hrs',
      level2: '~8 hrs',
      dcFast: '~25 min (10–80%)',
      maxDCkW: '170 kW',
    },
    {
      vehicle: 'Tesla Model Y Long Range',
      battery: '82 kWh',
      level1: '~68 hrs',
      level2: '~11 hrs',
      dcFast: '~28 min (10–80%)',
      maxDCkW: '250 kW',
    },
    {
      vehicle: 'Chevrolet Bolt EV',
      battery: '65 kWh',
      level1: '~54 hrs',
      level2: '~7 hrs',
      dcFast: '~60 min (10–80%)',
      maxDCkW: '55 kW',
    },
    {
      vehicle: 'Ford F-150 Lightning (Std Range)',
      battery: '98 kWh',
      level1: '~82 hrs',
      level2: '~8.5 hrs',
      dcFast: '~44 min (15–80%)',
      maxDCkW: '150 kW',
    },
    {
      vehicle: 'Hyundai Ioniq 5 Long Range',
      battery: '77.4 kWh',
      level1: '~65 hrs',
      level2: '~7 hrs',
      dcFast: '~18 min (10–80%)',
      maxDCkW: '350 kW (800V)',
    },
    {
      vehicle: 'Rivian R1T (Standard+)',
      battery: '135 kWh',
      level1: '~112 hrs',
      level2: '~13 hrs',
      dcFast: '~35 min (10–80%)',
      maxDCkW: '220 kW',
    },
    {
      vehicle: 'Nissan Leaf Plus',
      battery: '62 kWh',
      level1: '~52 hrs',
      level2: '~8 hrs',
      dcFast: '~60 min (10–80%)',
      maxDCkW: '50 kW',
    },
    {
      vehicle: 'BMW iX xDrive50',
      battery: '111.5 kWh',
      level1: '~93 hrs',
      level2: '~9 hrs',
      dcFast: '~35 min (10–80%)',
      maxDCkW: '195 kW',
    },
  ];

  return (
    <article style={{ maxWidth: 780, margin: '0 auto', padding: '48px 24px 80px' }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: 24, fontSize: 13, color: 'var(--text-dim)' }}>
        <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <Link href="/guides" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Guides</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>EV Charging Time</span>
      </nav>

      {/* Badge */}
      <div style={{ display: 'inline-block', background: 'rgba(var(--accent-rgb, 99,255,180),0.1)', border: '1px solid var(--accent)', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        Updated May 2026
      </div>

      <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
        How Long Does It Take to Charge an Electric Car?
      </h1>

      <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 32 }}>
        The honest answer: it depends entirely on your charger type and your battery size. Level 1 on a standard outlet takes 40–80 hours for a full charge. A home Level 2 charger cuts that to 4–12 hours overnight. DC fast charging can hit 80% in under 30 minutes. Here's the full breakdown.
      </p>

      {/* AdSense */}
      <ins
        className="adsbygoogle"
        data-ad-client="ca-pub-4323376361842642"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
        style={{ display: 'block', marginBottom: 32 }}
      />

      {/* Section 1 */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, marginTop: 40 }}>The Three Charging Levels Explained</h2>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 20 }}>
        EV charging is divided into three categories based on the power delivery method. Each level is a different combination of voltage, amperage, and connector type — and each has a radically different speed profile.
      </p>

      <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
        {chargingLevels.map((lvl) => (
          <div
            key={lvl.level}
            style={{
              background: 'var(--bg-card)',
              border: `1px solid var(--border)`,
              borderRadius: 14,
              padding: '20px 22px',
              borderLeft: `4px solid ${lvl.color}`,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 17, color: '#fff', marginBottom: 8 }}>{lvl.level}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Power</div>
                <div style={{ fontSize: 15, color: lvl.color, fontWeight: 700, fontFamily: 'var(--font-space-mono)' }}>{lvl.power}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Miles/Hour Added</div>
                <div style={{ fontSize: 15, color: lvl.color, fontWeight: 700, fontFamily: 'var(--font-space-mono)' }}>{lvl.milesPerHour}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Full Charge</div>
                <div style={{ fontSize: 15, color: '#fff', fontWeight: 700, fontFamily: 'var(--font-space-mono)' }}>{lvl.fullCharge}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Best For</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{lvl.bestFor}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, marginTop: 40 }}>Level 1 Charging: The Standard Outlet</h2>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        Level 1 charging uses a standard 120V household outlet and the EVSE cord that comes with every EV. No installation needed — just plug in. But at 1.2–1.9 kW, you're adding roughly 3–5 miles of range per hour.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        For a Tesla Model Y with an 82 kWh battery, that's theoretically 65+ hours to go from empty to full. In practice, nobody drives to 0%, but it illustrates the constraint. Level 1 is viable for two situations: plug-in hybrids (PHEVs with 8–20 kWh batteries that genuinely fill up overnight) and EV drivers who commute fewer than 30–40 miles a day and have 8+ hours plugged in.
      </p>

      <div style={{ background: 'rgba(255,200,0,0.07)', border: '1px solid rgba(255,200,0,0.2)', borderRadius: 14, padding: '18px 22px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,200,0,0.9)', marginBottom: 8 }}>⚠️ Level 1 Circuit Warning</div>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Never use an extension cord with a Level 1 EVSE. Drawing 12A continuously for 8+ hours through an undersized extension cord is a fire risk. Use only the outlet directly, and make sure it's on a dedicated 20A circuit if possible.
        </p>
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, marginTop: 40 }}>Level 2 Charging: The Right Tool for Home</h2>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        Level 2 uses a 240V circuit — the same type that powers your dryer or range. A dedicated EVSE (what people commonly call a "home charger") connects to this circuit and delivers 7.2–19.2 kW depending on the unit and your car's onboard charger capacity.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        At 7.2 kW — typical for a standard 32A EVSE — you're adding about 25 miles of range per hour. A 60 kWh battery that's at 20% needs roughly 6.7 hours to reach full. Leave it plugged in overnight and it's fully charged by morning. That covers 99% of daily use cases.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        Some vehicles accept up to 19.2 kW (80A circuit) — the Ford F-150 Lightning and some Tesla models are in this category. At that rate, you're adding 60–75 miles per hour. A full charge from empty on a 98 kWh Lightning takes about 8.5 hours even with the huge battery.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 24 }}>
        The onboard charger in your vehicle is the actual bottleneck, not the EVSE. A Chevy Bolt's onboard charger tops out at 7.2 kW — buying a 48A EVSE won't make it charge faster. Always check your vehicle's max AC charge rate before buying hardware. See our <Link href="/home-ev-charger-installation-guide-2026" style={{ color: 'var(--accent)' }}>home EV charger installation guide</Link> for what to look for.
      </p>

      {/* Mid-article AdSense */}
      <ins
        className="adsbygoogle"
        data-ad-client="ca-pub-4323376361842642"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
        style={{ display: 'block', marginBottom: 32 }}
      />

      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, marginTop: 40 }}>DC Fast Charging: Fastest, But Not for Daily Use</h2>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        DC fast charging (DCFC) bypasses the onboard AC-to-DC converter entirely and sends DC power straight to the battery pack. Networks like Tesla Supercharger, Electrify America, EVgo, and ChargePoint operate these stalls at 50–350 kW.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        The speed depends on both the station's output and your vehicle's max DC charge rate. A Hyundai Ioniq 5 with its 800V architecture can accept 350 kW and reach 10–80% in about 18 minutes — one of the fastest EVs available. A Chevy Bolt, by contrast, caps at 55 kW DCFC input and takes roughly an hour for the same 10–80% window.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        One critical detail: <strong style={{ color: '#fff' }}>charging always slows significantly above 80%</strong>. Battery management systems deliberately throttle input to protect cell health as you approach full. Charging from 80% to 100% at a DCFC can take as long as the 10–80% segment did. On road trips, stop at 80% and go — you'll move faster.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 24 }}>
        DCFC also costs 2–3x more per kWh than home charging. See our <Link href="/dc-fast-charging-cost-guide-2026" style={{ color: 'var(--accent)' }}>DC fast charging cost guide</Link> for 2026 network pricing. For most drivers, DCFC is a road-trip tool, not a daily routine.
      </p>

      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, marginTop: 40 }}>Charge Times by Vehicle (2026)</h2>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 20 }}>
        These are full-charge times from approximately 10–15% state of charge. DC fast charging shows 10–80% since that's the practical charging window. Level 2 assumes a 7.2 kW onboard charger or the vehicle's max AC rate if lower.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vehicle</th>
              <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Battery</th>
              <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Level 1</th>
              <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Level 2</th>
              <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DCFC (10–80%)</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, i) => (
              <tr key={v.vehicle} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                <td style={{ padding: '10px 12px', fontSize: 14, color: '#fff', fontWeight: 600 }}>{v.vehicle}</td>
                <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--text-dim)', textAlign: 'right', fontFamily: 'var(--font-space-mono)' }}>{v.battery}</td>
                <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--text-muted)', textAlign: 'right', fontFamily: 'var(--font-space-mono)' }}>{v.level1}</td>
                <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--text-muted)', textAlign: 'right', fontFamily: 'var(--font-space-mono)' }}>{v.level2}</td>
                <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--accent)', fontWeight: 700, textAlign: 'right', fontFamily: 'var(--font-space-mono)' }}>{v.dcFast}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, marginTop: 40 }}>Factors That Slow Down Charging</h2>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        The times above assume ideal conditions. In the real world, several variables reduce effective charge speed:
      </p>

      <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Cold weather', detail: 'Lithium batteries charge more slowly below 40°F (4°C). Many vehicles pre-condition the battery before a fast charge session, which adds time but protects the pack. In winter, add 20–40% to DCFC times.' },
          { title: 'Battery state of charge above 80%', detail: 'As mentioned, charging tapers sharply above 80%. Going from 80% to 100% at a DCFC often takes longer than 10–80% did.' },
          { title: 'Station power sharing', detail: 'At many DCFC stations, two chargers share a single power cabinet. If someone else is already charging on the adjacent stall, your max available power may be halved. Move to a different pair if possible.' },
          { title: 'Onboard charger limits', detail: 'Your vehicle\'s onboard AC charger caps Level 2 speeds. A 7.2 kW OBC on a 48A circuit still maxes out at 7.2 kW. Check your spec sheet.' },
          { title: 'Cable and connector losses', detail: 'Real-world charging is typically 85–90% efficient. A 50 kWh fill-up might draw 55–57 kWh from the grid.' },
        ].map((item) => (
          <div key={item.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>{item.title}</div>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0, lineHeight: 1.7 }}>{item.detail}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, marginTop: 40 }}>The Right Charger for Your Situation</h2>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        Most EV owners charge at home 80–90% of the time. If you have a garage or dedicated parking, a Level 2 EVSE is the right investment — installation typically runs $300–$800 including hardware and electrician. The cost per kWh at home averages $0.17 nationally, versus $0.35–$0.55 at public DCFC networks.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 16 }}>
        Apartment dwellers without dedicated parking face a tougher situation. Workplace charging and public Level 2 stations (typically $0.20–$0.35/kWh) become the primary option. See our guide on <Link href="/ev-charging-off-peak-savings-2026" style={{ color: 'var(--accent)' }}>EV charging off-peak savings</Link> to minimize costs wherever you charge.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 24 }}>
        For road trips, plan stops at DCFC stations every 150–200 miles and charge to 80%. Most modern EVs can do 20–30 minute stops that align naturally with bathroom and food breaks. Our <Link href="/ev-road-trip-charging-cost-calculator-2026" style={{ color: 'var(--accent)' }}>EV road trip cost calculator</Link> can plan exact charging stops and costs for your route.
      </p>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, rgba(var(--gradient-start), 0.12), rgba(var(--gradient-end), 0.08))', border: '1px solid var(--accent)', borderRadius: 16, padding: 28, textAlign: 'center', margin: '32px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Calculate Your Exact Charging Cost</div>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 20 }}>Enter your vehicle, battery size, and local electricity rate to see real charging costs per session, per month, and per year.</p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'linear-gradient(135deg, var(--accent), var(--gradient-end, #00c6ff))',
            color: '#000',
            textDecoration: 'none',
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          ⚡ Use the Free Calculator
        </Link>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20, marginTop: 40 }}>Frequently Asked Questions</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
        {[
          {
            q: 'How long does it take to fully charge an EV at home?',
            a: 'With a Level 2 home charger (7.2 kW), most EVs charge fully overnight in 6–12 hours. A 60 kWh battery starting at 20% takes about 7 hours. The exact time depends on your battery size and your charger\'s output. A standard 120V outlet (Level 1) would take 40–60 hours for the same car.',
          },
          {
            q: 'How long does it take to charge at a public fast charger?',
            a: 'DC fast charging typically gets you from 10% to 80% in 20–60 minutes depending on your vehicle and the station\'s power output. A Hyundai Ioniq 5 at a 350 kW station hits 80% in about 18 minutes. A Chevy Bolt at a 50 kW station takes closer to 60 minutes. Charging slows significantly above 80% — most drivers stop at 80% on road trips to keep moving.',
          },
          {
            q: 'Can I charge my EV every night even if the battery isn\'t empty?',
            a: 'Yes, and it\'s the recommended approach. Lithium battery packs handle partial charging well — it\'s actually gentler on the cells than deep cycling. Most automakers recommend keeping daily charging between 20–80% for battery longevity, reserving 100% charges for road trips. Your car\'s charging settings can cap the charge level automatically.',
          },
          {
            q: 'Why does charging slow down after 80%?',
            a: 'The battery management system (BMS) reduces charge rate above 80% to prevent overheating and protect cell chemistry. Pushing high current into nearly full cells can cause lithium plating, which permanently degrades capacity. The taper is intentional and universal across all lithium-ion EV batteries. From 80–100% can take as long as 10–80% did.',
          },
          {
            q: 'Does cold weather affect how long it takes to charge?',
            a: 'Yes, significantly. Below 40°F (4°C), battery chemistry slows and the BMS may throttle charge rate. Some vehicles pre-condition the battery before a DCFC session (especially Teslas navigating to a Supercharger), which improves speed but adds a few minutes. In extreme cold, DCFC sessions can take 40–80% longer than in moderate temperatures. Level 2 home charging is less affected.',
          },
        ].map((item) => (
          <div key={item.q} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.q}</h3>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0, lineHeight: 1.75 }}>{item.a}</p>
          </div>
        ))}
      </div>

      {/* Related guides */}
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16, marginTop: 40 }}>Related Guides</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
        {[
          { href: '/home-ev-charger-installation-guide-2026', title: 'Home EV Charger Installation Guide 2026', desc: 'Costs, permits, EVSE models, and what to ask your electrician.' },
          { href: '/dc-fast-charging-cost-guide-2026', title: 'DC Fast Charging Cost Guide 2026', desc: 'Per-kWh rates at Tesla, Electrify America, EVgo, and ChargePoint.' },
          { href: '/ev-charging-off-peak-savings-2026', title: 'EV Charging Off-Peak Savings 2026', desc: 'How much you save charging at night vs peak hours by state.' },
          { href: '/ev-road-trip-charging-cost-calculator-2026', title: 'EV Road Trip Charging Cost Calculator 2026', desc: 'Plan stops and estimate total charging costs for any road trip.' },
          { href: '/ev-vs-gas-cost-comparison-2026', title: 'EV vs Gas Cost Comparison 2026', desc: 'Total cost of ownership: fuel, maintenance, depreciation.' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'block',
              padding: '14px 18px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 3 }}>{link.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{link.desc}</div>
          </Link>
        ))}
      </div>

      {/* Author */}
      <div style={{ fontSize: 13, color: 'var(--text-dim)', paddingTop: 24, borderTop: '1px solid var(--border)', marginTop: 8 }}>
        By <strong style={{ color: 'var(--text-muted)' }}>Jean-Sébastien Binette</strong> — Updated May 2026
      </div>
    </article>
  );
}
