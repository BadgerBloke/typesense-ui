'use client';
import { useState } from 'react';

import { IconFileDownload } from '@tabler/icons-react';

import { CollectionType } from '~/app/(private-pages)/collections/components/schema';
import Typography from '~/components/atoms/typography';
import ValidationErrorTable from '~/components/atoms/validation-error-table';
import Dropzone from '~/components/organisms/dropzone';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { ScrollArea } from '~/components/ui/scroll-area';
import { DocumentsDataType } from '~/lib/interfaces/table-data-type';
import { excelReader } from '~/lib/utils/excel-handler';
import { jsonReader } from '~/lib/utils/json-handler';
import { dispatchToast } from '~/lib/utils/message-handler';

import { uploadBulkDocuments } from './actions';

const BulkUploader = ({ collection }: { collection: CollectionType }) => {
    const [validationResult, setValidationResult] = useState<{
        open: boolean;
        errors?: { [k: number]: string[] | undefined };
    }>({
        open: false,
    });
    const handleOnChange = async (files: File[]) => {
        const validation =
            files[0].type === 'application/json'
                ? await jsonReader(files, collection.fields)
                : await excelReader(files, collection.fields);
        if (validation.success) {
            dispatchToast({ type: 'success', message: 'Data has been successfully validated' });
            dispatchToast({ type: 'warning', message: 'Please wait while processing your data' });
            setValidationResult({ open: false });
            try {
                const res = await uploadBulkDocuments({
                    data: validation.data as unknown as DocumentsDataType[],
                    collection,
                });
                if (res) dispatchToast(res);
            } catch (error) {
                dispatchToast({ type: 'error', message: (error as Error).message });
            }
        } else {
            dispatchToast({ type: 'error', message: 'Data validation failed' });
            setValidationResult({
                errors: validation.error.flatten().fieldErrors,
                open: true,
            });
        }
    };

    const downloadJson = () => {
        const fileName = 'document-schema.json';
        const schema: { [x: string]: string } = {};
        for (const field of collection.fields) {
            schema[field.name] = field.optional ? `${field.type} - optional field` : `${field.type}`;
        }
        const jsonString = JSON.stringify([schema], null, 2);

        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create an anchor element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
    };
    return (
        <Card className="flex flex-col w-full">
            <CardHeader>
                <div className="flex gap-4 justify-between w-full items-center">
                    <div className="flex flex-col gap-1">
                        <CardTitle>Bulk upload</CardTitle>
                        <CardDescription>
                            You can index multiple documents in a batch using the Bulk upload feature.
                        </CardDescription>
                    </div>
                    <Button type="button" onClick={downloadJson}>
                        <IconFileDownload className="h-5 w-5" />
                        <Typography variant="small" className="ml-1 whitespace-nowrap xl:block hidden">
                            Download schema
                        </Typography>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid gap-8 h-full">
                {validationResult.open && validationResult.errors && (
                    <Dialog
                        defaultOpen={validationResult.open}
                        onOpenChange={e => setValidationResult(prev => ({ ...prev, open: e }))}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogClose onClick={() => setValidationResult({ open: false })} />
                                <DialogTitle>Data validation errors!</DialogTitle>
                                <DialogDescription>
                                    Please fix these errors in the excel file to upload the bulk data.
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-[75vh]">
                                <ValidationErrorTable errors={validationResult.errors} />
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                )}
                <Dropzone
                    accept={{
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                        'application/json': ['.json'],
                    }}
                    maxFiles={1}
                    maxSize={10}
                    onChange={handleOnChange}
                />
            </CardContent>
        </Card>
    );
};

export default BulkUploader;
