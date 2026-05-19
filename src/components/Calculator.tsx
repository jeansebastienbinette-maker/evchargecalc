'use client';

import { useState, useEffect, useRef } from 'react';
import vehicles from '@/data/vehicles.json';
import locations from '@/data/locations.json';

interface CalcResults {
  homeCPM: number;
  pubCPM: number;
  dcCPM: number;
  gasCPM: number;
  homeMo: number;
  pubMo: number;
  dcMo: number;
  gasMo: number;
  homeYr: number;
  pubYr: number;
  dcYr: number;
  gasYr: number;
  annualSavings: number;
}

export default function Calculator() {
  const [stateSlug, setStateSlug] = useState('');
  const [vehicleSlug, setVehicleSlug] = useState('');
  const [customEff, setCustomEff] = useState('');
  const [customBatt, setCustomBatt] = useState('');
  const [homeRate, setHomeRate] = useState('');
  const [gasPrice, setGasPrice] = useState('4.00');
  const [gasMPG, setGasMPG] = useState('28');
  const [monthlyMiles, setMonthlyMiles] = useState(1000);
  const [results, setResults] = useState<CalcResults | null>(null);
  const [showEmail, setShowEmail] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('evcc_email_submitted')) {
      setShowEmail(false);
    }
  }, []);

  const selectedLocation = locations.find(l => l.slug === stateSlug);
  const selectedVehicle = vehicles.find(v => v.slug === vehicleSlug);

  const handleStateChange = (slug: string) => {
    setStateSlug(slug);
    const loc = locations.find(l => l.slug === slug);
    if (loc) {
      setHomeRate(loc.electricity_rate.toFixed(2));
      setGasPrice(loc.gas_price.toFixed(2));
    }
  };

  const handleVehicleChange = (slug: string) => {
    setVehicleSlug(slug);
  };

  const calculate = () => {
    let eff: number, batt: number;
    if (vehicleSlug === 'custom') {
      eff = parseFloat(customEff) || 3.5;
      batt = parseFloat(customBatt) || 75;
    } else if (selectedVehicle) {
      eff = selectedVehicle.efficiency_mi_per_kwh;
      batt = selectedVehicle.battery_kwh;
    } else {
      eff = 3.5;
      batt = 75;
    }

    const rate = parseFloat(homeRate) || 0.17;
    const gas = parseFloat(gasPrice) || 4.00;
    const mpg = parseFloat(gasMPG) || 28;
    const publicL2Rate = rate * 1.8;
    const dcRate = 0.49;

    const kwhPerMile = 1 / eff;
    const homeCPM = kwhPerMile * rate;
    const pubCPM = kwhPerMile * publicL2Rate;
    const dcCPM = kwhPerMile * dcRate;
    const gasCPM = gas / mpg;

    const homeMo = homeCPM * monthlyMiles;
    const pubMo = pubCPM * monthlyMiles;
    const dcMo = dcCPM * monthlyMiles;
    const gasMo = gasCPM * monthlyMiles;

    const r: CalcResults = {
      homeCPM, pubCPM, dcCPM, gasCPM,
      homeMo, pubMo, dcMo, gasMo,
      homeYr: homeMo * 12,
      pubYr: pubMo * 12,
      dcYr: dcMo * 12,
      gasYr: gasMo * 12,
      annualSavings: gasMo * 12 - homeMo * 12,
    };

    setResults(r);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculate', {
        event_category: 'Calculator',
        event_label: vehicleSlug || 'default',
        value: Math.round(r.annualSavings),
      });
    }

    if (typeof window !== 'undefined' && localStorage.getItem('evcc_email_submitted')) {
      setShowResults(true);
      setShowEmail(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else {
      setShowEmail(true);
      setShowResults(false);
    }
  };

  const submitEmail = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    if (typeof window !== 'undefined') {
      localStorage.setItem('evcc_email_submitted', '1');
      if (window.gtag) window.gtag('event', 'email_submit', { event_category: 'Lead', event_label: 'calculator_gate' });
    }
    setShowEmail(false);
    setShowResults(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const reset = () => {
    setStateSlug('');
    setVehicleSlug('');
    setHomeRate('');
    setGasPrice('4.00');
    setGasMPG('28');
    setMonthlyMiles(1000);
    setResults(null);
    setShowEmail(false);
    setShowResults(false);
  };

  const f2 = (v: number) => '$' + v.toFixed(2);
  const f0 = (v: number) => '$' + v.toFixed(0);

  const maxMo = results ? Math.max(results.homeMo, results.pubMo, results.dcMo, results.gasMo) : 1;
  const pct = (v: number) => Math.max(10, (v / maxMo) * 100) + '%';

  return (
    <section style={{ padding: '0 0 60px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="calc-grid-responsive">

          {/* LEFT: Inputs */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🔌</span>
              Your Details
            </h2>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>Your State</label>
              <select
                value={stateSlug}
                onChange={e => handleStateChange(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 15, outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }}
              >
                <option value="">Select your state...</option>
                {locations.map(l => (
                  <option key={l.slug} value={l.slug}>{l.name} — ${l.electricity_rate.toFixed(2)}/kWh</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>EV Model</label>
              <select
                value={vehicleSlug}
                onChange={e => handleVehicleChange(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 15, outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }}
              >
                <option value="">Select your EV...</option>
                {vehicles.map(v => (
                  <option key={v.slug} value={v.slug}>{v.brand} {v.model} — {v.efficiency_mi_per_kwh} mi/kWh</option>
                ))}
                <option value="custom">Custom / Other EV</option>
              </select>
            </div>

            {vehicleSlug === 'custom' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>Efficiency (mi/kWh)</label>
                  <input type="number" value={customEff} onChange={e => setCustomEff(e.target.value)} step="0.1" placeholder="3.5" min="1" max="8"
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 15, outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>Battery Size (kWh)</label>
                  <input type="number" value={customBatt} onChange={e => setCustomBatt(e.target.value)} step="1" placeholder="75" min="10" max="250"
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 15, outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }} />
                </div>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>Monthly Miles</label>
                <span style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 14, color: 'var(--accent)', fontWeight: 700 }}>{monthlyMiles.toLocaleString()}</span>
              </div>
              <input type="range" min="200" max="4000" step="100" value={monthlyMiles} onChange={e => setMonthlyMiles(parseInt(e.target.value))} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>Home Rate ($/kWh)</label>
                <input type="number" value={homeRate} onChange={e => setHomeRate(e.target.value)} step="0.01" placeholder="0.17"
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 15, outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>Gas Price ($/gal)</label>
                <input type="number" value={gasPrice} onChange={e => setGasPrice(e.target.value)} step="0.01" placeholder="4.00"
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 15, outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }} />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>Gas Car MPG (for comparison)</label>
              <input type="number" value={gasMPG} onChange={e => setGasMPG(e.target.value)} step="1" placeholder="28"
                style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 15, outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }} />
            </div>

            <button
              onClick={calculate}
              style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', border: 'none', borderRadius: 12, color: '#fff', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 16, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.3px' }}
            >
              ⚡ Calculate My Charging Cost
            </button>
            <button
              onClick={reset}
              style={{ width: '100%', padding: 10, background: 'transparent', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 14, cursor: 'pointer', marginTop: 10 }}
            >
              Reset
            </button>
          </div>

          {/* RIGHT: Results */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📊</span>
              Your Results
            </h2>

            {/* Email Gate */}
            {showEmail && (
              <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', border: '1px solid var(--border-accent)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>📊 Your Results Are Ready</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>Enter your email to see your full charging cost breakdown instantly — right here on this page. No account needed, 100% free.</p>
                <div style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    onKeyDown={e => e.key === 'Enter' && submitEmail()}
                    style={{ flex: 1, padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 15, outline: 'none' }}
                  />
                  <button
                    onClick={submitEmail}
                    style={{ padding: '12px 24px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 14 }}
                  >
                    Show My Results →
                  </button>
                </div>
                {emailError && <div style={{ color: 'var(--red)', fontSize: 13, marginTop: 8 }}>{emailError}</div>}
                <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 12 }}>✓ Results appear instantly · ✓ No signup required · ✓ Unsubscribe anytime</div>
              </div>
            )}

            {/* Results Panel */}
            {showResults && results && (
              <div ref={resultsRef}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Cost per Mile</div>
                    <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 28, fontWeight: 700, color: 'var(--accent)' }}>${results.homeCPM.toFixed(3)}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>home charging</div>
                  </div>
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Monthly Cost</div>
                    <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 28, fontWeight: 700, color: 'var(--green)' }}>{f0(results.homeMo)}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>at home rates</div>
                  </div>
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Annual Savings</div>
                    <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 28, fontWeight: 700, color: 'var(--yellow)' }}>{f0(results.annualSavings)}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>vs gasoline</div>
                  </div>
                </div>

                {/* Comparison bars */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Monthly Fuel Cost Comparison</h3>
                  {[
                    { label: '🏠 Home L2', value: results.homeMo, color: 'linear-gradient(90deg, var(--green), #059669)' },
                    { label: '🔌 Public L2', value: results.pubMo, color: 'linear-gradient(90deg, var(--yellow), #d97706)' },
                    { label: '⚡ DC Fast', value: results.dcMo, color: 'linear-gradient(90deg, var(--red), #dc2626)' },
                    { label: '⛽ Gasoline', value: results.gasMo, color: 'linear-gradient(90deg, #9333ea, #7c3aed)' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                      <div style={{ width: 100, fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 }}>{row.label}</div>
                      <div style={{ flex: 1, height: 32, background: 'var(--bg)', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ width: pct(row.value), height: '100%', borderRadius: 8, background: row.color, display: 'flex', alignItems: 'center', paddingLeft: 12, fontFamily: 'var(--font-space-mono), monospace', fontSize: 13, fontWeight: 700, color: '#fff', transition: 'width 0.8s ease', minWidth: 40 }}>
                          {f0(row.value)}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: 13, fontWeight: 700, color: 'var(--text)', width: 80, textAlign: 'right', flexShrink: 0 }}>{f0(row.value)}/mo</div>
                    </div>
                  ))}
                </div>

                {/* Breakdown table */}
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px', background: 'var(--bg-card-hover)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)' }}>
                    <div>Charging Method</div><div>$/mile</div><div>$/month</div><div>$/year</div>
                  </div>
                  {[
                    { label: '🏠 Home (Level 2)', cpm: results.homeCPM, mo: results.homeMo, yr: results.homeYr, bg: 'transparent' },
                    { label: '🔌 Public (Level 2)', cpm: results.pubCPM, mo: results.pubMo, yr: results.pubYr, bg: 'transparent' },
                    { label: '⚡ DC Fast Charger', cpm: results.dcCPM, mo: results.dcMo, yr: results.dcYr, bg: 'transparent' },
                    { label: '⛽ Gasoline (comparison)', cpm: results.gasCPM, mo: results.gasMo, yr: results.gasYr, bg: 'var(--bg-card-hover)' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14, background: row.bg }}>
                      <div style={{ fontWeight: 600 }}>{row.label}</div>
                      <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontWeight: 600 }}>{f2(row.cpm)}</div>
                      <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontWeight: 600 }}>{f0(row.mo)}</div>
                      <div style={{ fontFamily: 'var(--font-space-mono), monospace', fontWeight: 600 }}>{f0(row.yr)}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 16, padding: '12px 16px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)', lineHeight: 1.5 }}>
                  Estimates for planning purposes only. Actual costs depend on your utility rate structure, charging habits, vehicle condition, climate, and driving style.
                </div>
              </div>
            )}

            {!showEmail && !showResults && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
                <div style={{ fontSize: 16, color: 'var(--text-muted)' }}>Select your state and EV, then click Calculate</div>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .calc-grid-responsive { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
