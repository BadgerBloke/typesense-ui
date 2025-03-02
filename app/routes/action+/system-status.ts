import axios from 'axios';

import { SEARCH_ENGINE_CONFIG } from '~/.server/config';

export const loader = async () => {
    try {
        const res = await axios.get(`${SEARCH_ENGINE_CONFIG.baseUrl}/health`);

        if (res.status === 200) {
            return res.data;
        }

        return {
            ok: false,
        };
    } catch {
        return {
            ok: false,
        };
    }
};
