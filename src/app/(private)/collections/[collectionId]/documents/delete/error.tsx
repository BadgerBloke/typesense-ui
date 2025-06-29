'use client';

import { RefreshCcw } from 'lucide-react';

import Typography from '~/components/atoms/typography';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <Card className="w-fit m-auto">
            <CardHeader>
                <CardTitle>Error</CardTitle>
                <CardDescription>Something went wrong!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-6">
                    <Typography variant="small">{error.message}</Typography>
                    <Button className="w-fit" onClick={() => reset()}>
                        <RefreshCcw className="size-4 mr-2" />
                        Try again
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
