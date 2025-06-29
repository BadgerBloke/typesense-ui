'use client';

import { useState } from 'react';
import { Download, Loader } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { dispatchToast } from '~/lib/utils/message-handler';

import { exportDocuments } from './actions';

export default function DocumentsExportButton({ collectionId }: { collectionId: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);

        try {
            const result = await exportDocuments({ collectionId });

            if (result.success) {
                const blob = new Blob([result.data], { type: 'application/x-ndjson' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = result.filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } else {
                dispatchToast({ type: 'error', message: `Download failed: ${result.error}` });
            }
        } catch (error) {
            dispatchToast({ type: 'error', message: 'Download failed: ' + error });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button variant="outline" onClick={handleDownload} disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader className="size-4 mr-2 animate-spin" />
                    Exporting...
                </>
            ) : (
                <>
                    <Download className="size-4 mr-2" />
                    Export documents
                </>
            )}
        </Button>
    );
}
