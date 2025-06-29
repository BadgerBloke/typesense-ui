'use client';

import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button, ButtonProps } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const SubmitButton = ({ disabled, children, className, ...props }: ButtonProps) => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={disabled || pending} className={cn('w-fit ml-auto', className)} {...props}>
            {pending && <Loader className="mr-2 size-4 animate-spin" />}
            {pending ? 'Wait...' : (children ?? 'Submit')}
        </Button>
    );
};

export default SubmitButton;
