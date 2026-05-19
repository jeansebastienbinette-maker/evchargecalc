import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0f1a',
        'bg-card': '#111827',
        'bg-card-hover': '#1a2332',
        border: '#1e2d3d',
        'border-accent': 'rgba(34,211,238,0.2)',
        accent: '#22d3ee',
        'accent-glow': 'rgba(34,211,238,0.25)',
        green: '#34d399',
        yellow: '#fbbf24',
        red: '#f87171',
        purple: '#a78bfa',
        'gradient-start': '#06b6d4',
        'gradient-end': '#8b5cf6',
        text: '#e2e8f0',
        'text-muted': '#94a3b8',
        'text-dim': '#64748b',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      borderRadius: {
        card: '14px',
        'card-lg': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
