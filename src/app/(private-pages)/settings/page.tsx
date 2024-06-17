import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import { client } from '~/lib/services/typesense';

import ApiKeyCreationCard from './components/api-key-creation-form';
import ApiKeysCard from './components/api-keys-card';

const SettingsPage = async () => {
    const collections = await client.collections().retrieve();

    return (
        <div className="flex h-full w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full gap-2">
                    <Typography variant="h1" className="text-3xl font-semibold">
                        Settings
                    </Typography>
                </div>
                <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link href="#api-keys" className="font-semibold text-primary">
                            API Keys
                        </Link>
                        <Link href="#">Security</Link>
                        <Link href="#">Integrations</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Organizations</Link>
                        <Link href="#">Advanced</Link>
                    </nav>
                    <div className="grid gap-10">
                        <ApiKeysCard />
                        <ApiKeyCreationCard collections={collections} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
