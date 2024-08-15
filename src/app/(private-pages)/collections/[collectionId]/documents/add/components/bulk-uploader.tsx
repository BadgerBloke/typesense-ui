'use client';
import { useState } from 'react';

import { CollectionType } from '~/app/(private-pages)/collections/components/schema';
import ValidationErrorTable from '~/components/atoms/validation-error-table';
import Dropzone from '~/components/organisms/dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { ScrollArea } from '~/components/ui/scroll-area';
import { DocumentsDataType } from '~/lib/interfaces/table-data-type';
import { excelReader } from '~/lib/utils/excel-handler';
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
        const validation = await excelReader(files, collection.fields);
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
    return (
        <Card className="flex flex-col w-full">
            <CardHeader>
                <CardTitle>Bulk upload</CardTitle>
                <CardDescription>You can index multiple documents in a batch using the Bulk upload feature.</CardDescription>
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
                        'text/csv': ['.csv'],
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
