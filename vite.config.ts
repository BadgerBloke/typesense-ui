import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
