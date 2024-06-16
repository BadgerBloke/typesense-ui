import { MetadataRoute } from 'next';

import { CLIENT } from '~/lib/config';

const robots = (): MetadataRoute.Robots => {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/users/',
        },
        sitemap: `${CLIENT.host}/sitemap.xml`,
    };
};

export default robots;
