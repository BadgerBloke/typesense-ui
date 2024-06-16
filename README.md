This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Create NextJS App using this Example

```bash
pnpm create next-app@latest --example https://github.com/MKSingh-Dev/nextjs-starter-with-lint
```

## Getting Started

**A NextJS `app` router `TypeScript` and `TailwindCSS` starter template with `eslint`, `prettier`, and `husky` along with `lintstaged` configuration.**

First, run the development server:

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Update the Dependencies

NextJS default dependencies

```shell
pnpm add next@latest react@latest react-dom@latest
```

These are also NextJS's default but I've segregated these into devDependencies

```shell
pnpm add -D @types/node@latest @types/react@latest @types/react-dom@latest autoprefixer@latest eslint@latest eslint-config-next@latest postcss@latest tailwindcss@latest typescript@latest
```

Linting and Husky Dependencies<br/>
📝 Updating the linting dependencies may break the linting flow in that case you should keep the current version of these dependencies.

```shell
pnpm add -D @next/eslint-plugin-next@latest @typescript-eslint/eslint-plugin@latest eslint-config-google@latest eslint-config-prettier@latest eslint-config-standard-with-typescript@latest eslint-plugin-import@latest eslint-plugin-jsx-a11y@latest eslint-plugin-n@latest eslint-plugin-prettier@latest eslint-plugin-promise@latest eslint-plugin-react@latest eslint-plugin-react-hooks@latest eslint-plugin-simple-import-sort@latest husky lint-staged@latest match-sorter@latest prettier-plugin-tailwindcss@latest
```

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
