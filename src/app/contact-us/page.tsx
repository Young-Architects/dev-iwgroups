import Contact from "@/components/contact/contact"
import { DEFAULT_SEO, LoadSeoData } from "@/components/metadata/metadata";
import { SLUG } from "@/constant/constant";
import { fetchSeoData } from "@/lib/wordpress";
import { Metadata } from "next";

 

function page() {

 
  return (
     <>
     <Contact/>
     </>
  )
}

export default page

export async function generateMetadata(): Promise<Metadata> {
  try {
    const slug = SLUG[0];
    const data = await fetchSeoData(slug);
    if (!data || !data.head) {
      return {
        title: DEFAULT_SEO.title,
        description: DEFAULT_SEO.description,
      };
    }
    const metadata = await LoadSeoData({ data });
    return {
      title: metadata.title || DEFAULT_SEO.title,
      description: metadata.description || DEFAULT_SEO.description,
      openGraph: {
        title: metadata.title || DEFAULT_SEO.title,
        description: metadata.description || DEFAULT_SEO.description,
        locale: metadata.locale || 'en_US',
        type: (metadata.type as any) || 'website',
        url: metadata.url || '',
        siteName: metadata.siteName || '',
      },
      twitter: {
        card: (metadata.card as any) || 'summary_large_image',
        title: metadata.twitterTitle || metadata.title,
        description:
          metadata.twitterDescription || metadata.description,
      },
    };
  } catch (error) {
    console.error('SEO metadata error:', error);
    return {
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
    };
  }
}
