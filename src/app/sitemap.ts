import { MetadataRoute } from 'next';
import vehicles from '@/data/vehicles.json';
import locations from '@/data/locations.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://evchargecalc.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/cost-to-charge`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/ev-vs-gas-cost-comparison-2026`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/ev-charging-cost-by-state-2026`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/home-ev-charger-installation-guide-2026`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ev-charging-off-peak-savings-2026`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/dc-fast-charging-cost-guide-2026`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solar-ev-charging-savings-2026`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ev-tax-credits-incentives-2026`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ev-road-trip-charging-cost-calculator-2026`, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map(v => ({
    url: `${baseUrl}/vehicles/${v.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const statePages: MetadataRoute.Sitemap = locations.map(l => ({
    url: `${baseUrl}/states/${l.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const programmaticPages: MetadataRoute.Sitemap = vehicles.flatMap(v =>
    locations.map(l => ({
      url: `${baseUrl}/cost-to-charge/${v.slug}-in-${l.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...vehiclePages, ...statePages, ...programmaticPages];
}
