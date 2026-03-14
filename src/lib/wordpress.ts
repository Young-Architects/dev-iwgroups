const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPageBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&acf_format=standard`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    if (data) {
      return data[0] ?? null;
    }
  } catch (error) {
    console.error('not able to fetch api');
    return null;
  }
};
export const fetchTeamMembers = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/api/v2/our-teams?&acf_format=standard`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    if (data) {
      return data ?? null;
    }
  } catch (error) {
    console.error('not able to fetch api');
    return null;
  }
};
export const fetchIndustryMenu = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/api/v2/industries?&acf_format=standard`,
      { cache: 'no-store' }
    );
   
    const data = await res.json();
    if (data) {
      return data[0] ?? null;
    }
  } catch (error) {
    console.error('not able to fetch api');
    return null;
  }
};
 