'use client';
import { Children, isValidElement } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import DropzonePrimitive, { DropzoneProps, DropzoneRootProps } from 'react-dropzone';

import { cn } from '~/lib/utils';
import { dispatchToast } from '~/lib/utils/message-handler';

import Typography from '../atoms/typography';

export const DragIdeal: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const DragAccept: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const DragReject: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
type AllowedChildren =
    | React.ReactElement<typeof DragIdeal>
    | React.ReactElement<typeof DragAccept>
    | React.ReactElement<typeof DragReject>;
export interface DropzoneExtendedProps extends Omit<DropzoneProps, 'children'> {
    children?: AllowedChildren | AllowedChildren[];
    inputClassName?: string;
    idealStateTitle?: string;
    idealStateDescription?: string;
    acceptStateTitle?: string;
    acceptStateDescription?: string;
    rejectStateTitle?: string;
    rejectStateDescription?: string;
    onChange: (val: File[]) => void;
}
interface DropzoneRootExtendedProps extends DropzoneRootProps {
    className?: string;
}
const DropzoneRoot: React.FC<DropzoneRootExtendedProps> = ({ children, className, ...props }) => (
    <div className={cn('cursor-pointer h-full', className)} {...props}>
        {children}
    </div>
);
const Dropzone: React.FC<DropzoneExtendedProps> = ({
    children,
    onChange,
    idealStateTitle,
    idealStateDescription,
    acceptStateTitle,
    acceptStateDescription,
    rejectStateTitle,
    rejectStateDescription,
    maxSize,
    ...props
}) => {
    const filteredChildren = Children.toArray(children).filter((child): child is AllowedChildren => {
        return isValidElement(child) && (child.type === DragIdeal || child.type === DragAccept || child.type === DragReject);
    });
    if (Children.count(children) !== Children.count(filteredChildren)) {
        throw new Error('Invalid child component passed to Dropzone');
    }

    const handleFileValidation = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            dispatchToast({
                type: 'warning',
                message: 'File selected, please wait while validating your data',
            });
            onChange(acceptedFiles);
        } else {
            dispatchToast({
                type: 'error',
                message: 'No file selected, please select correct file again',
            });
        }
    };
    const handleDrop = (acceptedFiles: File[]): void => {
        if (maxSize && maxSize >= 0) {
            const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize * 1024 * 1024);
            if (oversizedFiles.length > 0) {
                dispatchToast({
                    type: 'error',
                    message: 'File size limit exceeded. Please upload a smaller file size.',
                });
            } else {
                handleFileValidation(acceptedFiles);
            }
        } else {
            handleFileValidation(acceptedFiles);
        }
    };
    return (
        <DropzonePrimitive onDrop={handleDrop} {...props}>
            {({ getRootProps, getInputProps, isDragAccept, isDragReject }): JSX.Element => (
                <DropzoneRoot {...getRootProps()} ref={null}>
                    <input {...getInputProps()} />
                    {isDragAccept &&
                        (filteredChildren.find(child => child.type === DragAccept) || (
                            <div
                                className={clsx({
                                    'flex flex-col gap-4 items-center px-4 py-3 h-full justify-center rounded-lg border border-dashed border-success bg-green-400/20':
                                        true,
                                    'cursor-not-allowed grayscale opacity-75': props.disabled,
                                })}
                            >
                                <Image
                                    src="/images/icons/insurance.png"
                                    alt="Supported file type icon"
                                    height={48}
                                    width={48}
                                    priority
                                />
                                <div className="flex gap-1 items-center">
                                    <Typography variant="small" className="text-success-foreground">
                                        {acceptStateTitle ? acceptStateTitle : 'Supported File'}
                                    </Typography>
                                    <Typography variant="muted">
                                        {acceptStateDescription ? acceptStateDescription : 'you can drop it here'}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    {isDragReject &&
                        (filteredChildren.find(child => child.type === DragReject) || (
                            <div
                                className={clsx({
                                    'flex flex-col gap-4 items-center px-4 py-3 h-full justify-center rounded-lg border border-dashed border-destructive bg-destructive/30':
                                        true,
                                    'cursor-not-allowed grayscale opacity-75': props.disabled,
                                })}
                            >
                                <Image
                                    src="/images/icons/cancel.png"
                                    alt="Unsupported file type icon"
                                    height={48}
                                    width={48}
                                    priority
                                />
                                <div className="flex gap-1 items-center">
                                    <Typography variant="small" className="text-destructive-foreground">
                                        {rejectStateTitle ? rejectStateTitle : 'Unsupported File'}
                                    </Typography>
                                    <Typography variant="muted">
                                        {rejectStateDescription ? rejectStateDescription : 'wrong file selected.'}
                                    </Typography>
                                </div>
                                {props.accept ? (
                                    <Typography variant="muted" className="-mt-3">
                                        Only{' '}
                                        {Object.values(props.accept)
                                            .flat()
                                            .map(extension => extension.slice(1))
                                            .join(', ')}{' '}
                                        are supported
                                    </Typography>
                                ) : null}
                            </div>
                        ))}
                    {!isDragAccept &&
                        !isDragReject &&
                        (filteredChildren.find(child => child.type === DragIdeal) || (
                            <div
                                className={clsx({
                                    'flex flex-col gap-4 flex-1 items-center px-4 py-3 h-full justify-center rounded-lg border border-dashed':
                                        true,
                                    'cursor-not-allowed grayscale opacity-75': props.disabled,
                                    'hover:border-foreground hover:bg-muted transition-colors duration-300': !props.disabled,
                                })}
                            >
                                <Image src="/images/icons/excel.png" alt="File type icon" height={48} width={48} priority />
                                <div className="flex gap-1 items-center">
                                    <Typography variant="small">{idealStateTitle ? idealStateTitle : 'Choose'}</Typography>
                                    <Typography variant="muted">
                                        {idealStateDescription ? idealStateDescription : 'a file to upload'}
                                    </Typography>
                                </div>
                                {props.accept ? (
                                    <Typography variant="muted" className="-mt-3">
                                        supported file formats are{' '}
                                        {Object.values(props.accept)
                                            .flat()
                                            .map(extension => extension.slice(1))
                                            .join(', ')}
                                    </Typography>
                                ) : null}
                            </div>
                        ))}
                </DropzoneRoot>
            )}
        </DropzonePrimitive>
    );
};
export default Dropzone;
