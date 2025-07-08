import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import NativeExtensionsProvider from '~/components/providers/native-extensions-provider';
import ThemeProvider from '~/components/providers/theme-provider';
import { Toaster } from '~/components/ui/sonner';
import { cn } from '~/lib/utils';

import '~/lib/utils/string-extensions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: { default: 'Typesense UI', template: '%s | Typesense UI' },
    description: 'Typesense UI is a free and open-source UI for Typesense, the open-source, typo-tolerant search engine.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
            <body className={cn(inter.className, 'flex flex-col min-h-svh antialiased')}>
                <SessionProvider>
                    <NativeExtensionsProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                            <Toaster richColors />
                            {children}
                        </ThemeProvider>
                    </NativeExtensionsProvider>
                </SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
