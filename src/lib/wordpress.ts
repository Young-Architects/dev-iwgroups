const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPageBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/home`,
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