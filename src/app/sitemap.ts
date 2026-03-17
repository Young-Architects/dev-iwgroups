import { BASE_URL, SLUG } from '@/constant/constant';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = SLUG.map((slug) => ({
    url: slug === 'home' ? `${BASE_URL}` : `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: slug === 'home' ? 1 : 0.8,
  }));
  return pages;
}