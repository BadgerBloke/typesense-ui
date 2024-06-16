import Link from 'next/link';

import Tooltip from '~/components/atoms/tooltip';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const Hero: React.FC = () => (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <Link
                href="https://twitter.com/ca_mksingh"
                className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                target="_blank"
            >
                Follow along on Twitter
            </Link>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                ytPipe to manage your YouTube{' '}
                <Tooltip message="like:- Manager, Editor, etc.">
                    <span className="mr-2 cursor-help underline">resources</span>
                </Tooltip>
                with{' '}
                <Tooltip message="Role Based Access Control">
                    <span className="cursor-help underline">RBAC</span>
                </Tooltip>
                .
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8">
                A web app for managing the YouTube resources like - Channel Manager, Video Editor, etc. with role based
                access control has been built with Next.js 14 and open sourced. Follow along as we figure this out together.
            </p>
            <div className="space-x-4">
                <Link href="/channels/undefined" className={cn(buttonVariants({ size: 'lg' }))}>
                    Get Started
                </Link>
                <Link
                    href="https://github.com/BadgerBloke/ytPipe"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
                >
                    GitHub
                </Link>
            </div>
        </div>
    </section>
);

export default Hero;
