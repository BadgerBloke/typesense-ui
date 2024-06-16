const path = require('path');
const buildEslintCommand = filenames => [
    `next lint --fix --file ${filenames.map(f => path.relative(process.cwd(), f)).join('\n--file ')}`,
    `pnpm prettier --write ${filenames.join('\n')}`,
];

module.exports = {
    '**/*.(ts|tsx)': () => 'pnpm tsc --noEmit',
    '**/*.{js,jsx,ts,tsx}': buildEslintCommand,
    '**/*.(md|json)': filenames => `pnpm prettier --write ${filenames.join('\n')}`,
};
