export interface SeoMetadata {
    title: string;
    description: string;
    locale: string;
    type: string;
    url: string;
    siteName: string;
    updatedTime: string;
    card: string;
    twitterTitle: string;
    twitterDescription: string;
}

export interface RankMathSeoResponse {
    success: boolean;
    head: string;
    title: string;
}

export const DEFAULT_SEO = {
    title: 'Inner Work Groups',
    description: 'Default description for website',
};

export const LoadSeoData = async ({
    data,
}: {
    data: RankMathSeoResponse | null;
}): Promise<SeoMetadata> => {
    const head = data?.head || '';

    const getMeta = (regex: RegExp) =>
        head.match(regex)?.[1] || '';

    return {
        title: getMeta(/<meta property="og:title" content="([^"]+)"/),
        description: getMeta(/<meta property="og:description" content="([^"]+)"/),
        locale: getMeta(/<meta property="og:locale" content="([^"]+)"/),
        type: getMeta(/<meta property="og:type" content="([^"]+)"/),
        url: getMeta(/<meta property="og:url" content="([^"]+)"/),
        siteName: getMeta(/<meta property="og:site_name" content="([^"]+)"/),
        updatedTime: getMeta(/<meta property="og:updated_time" content="([^"]+)"/),
        card: getMeta(/<meta name="twitter:card" content="([^"]+)"/),
        twitterTitle: getMeta(/<meta name="twitter:title" content="([^"]+)"/),
        twitterDescription: getMeta(/<meta name="twitter:description" content="([^"]+)"/),
    };
};