import { MetadataRoute } from 'next';

import { CLIENT } from '~/lib/config';

const sitemap = (): MetadataRoute.Sitemap => {
    return [
        {
            url: `${CLIENT.host}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${CLIENT.host}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${CLIENT.host}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ];
};

export default sitemap;
