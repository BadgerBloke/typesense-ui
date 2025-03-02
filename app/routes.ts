import { flatRoutes } from 'remix-flat-routes';

import { remixRoutesOptionAdapter } from '@react-router/remix-routes-option-adapter';

export default remixRoutesOptionAdapter(defineRoutes => {
    return flatRoutes('routes', defineRoutes, {
        ignoredRouteFiles: ['**/.*'],
    });
});
