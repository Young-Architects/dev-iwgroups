const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const fetchPageBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&acf_format=standard`,
      
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
export const fetchHeaderFooter = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wp/v2/header-footer-settings?&acf_format=standard`,
       
    );
   
    const data = await res.json();
    if (data) {
      return data?? null;
    }
  } catch (error) {
    console.error('not able to fetch api');
    return null;
  }
};
export const saveContactForm = async (userData:RequestInit) => {
  try {
    let data = await fetch(`${BASE_URL}/wp-json/contact-form-7/v1/contact-forms/153/feedback`, userData)
    let response = await data.json()
    return response
  } catch (error) {
    console.error('not able to fetch api');
    return null;
  }
};
 

   

// SEO RELATED APIS


export const fetchSeoData = async (slug: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/rankmath/v1/getHead?url=${BASE_URL}/${slug}`,
       
    );
   
    const data = await res.json();
    if (data) {
      return data?? null;
    }
  } catch (error) {
    console.error('not able to fetch api');
    return null;
  }
};