import { IconLoader2 } from '@tabler/icons-react';

import Typography, { TypographyVariant } from '../atoms/typography';

interface LoaderProps {
    message?: string;
    size?: number;
    messageClass?: string;
    variant?: TypographyVariant;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', size = 20, messageClass, variant = 'small' }) => (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center">
        <IconLoader2 style={{ height: `${size}px`, width: `${size}px` }} className="animate-spin" />
        {message ? (
            <Typography variant={variant} className={messageClass}>
                {message}
            </Typography>
        ) : null}
    </div>
);

export default Loader;
