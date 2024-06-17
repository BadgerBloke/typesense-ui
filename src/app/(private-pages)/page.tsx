// import Image from 'next/image';

import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

import Typography from '~/components/atoms/typography';
import { TYPESENSE } from '~/lib/config';

const HomePage = async () => {
    const typesenseHealth = await fetch(`${TYPESENSE.getHealthCheckUrl()}`).then(r => r.json());
    return (
        <div className="flex flex-col items-center justify-between p-24">
            {typesenseHealth.ok ? (
                <Typography
                    variant="small"
                    className="text-emerald-500 border border-emerald-500 bg-emerald-50 rounded-full inline-flex gap-1 items-center px-2 py-1"
                >
                    <CheckCircledIcon className="h-4 w-4" /> System is steady
                </Typography>
            ) : (
                <Typography
                    variant="small"
                    className="text-rose-500 border border-rose-500 bg-rose-50 rounded-full inline-flex gap-1 items-center px-2 py-1"
                >
                    <CrossCircledIcon className="h-4 w-4" /> System isn&apos;t steady
                </Typography>
            )}
        </div>
    );
};

export default HomePage;
