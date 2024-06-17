import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';

export interface MessageResponse {
    type: 'success' | 'error' | 'info' | 'warning' | 'redirect';
    message: string;
}

export class Message {
    public static redirect(message: string): MessageResponse {
        return {
            type: 'redirect',
            message,
        };
    }
    public static success(message: string): MessageResponse {
        return {
            type: 'success',
            message,
        };
    }

    public static error(message: string): MessageResponse {
        return {
            type: 'error',
            message,
        };
    }

    public static info(message: string): MessageResponse {
        return {
            type: 'info',
            message,
        };
    }

    public static warning(message: string): MessageResponse {
        return {
            type: 'warning',
            message,
        };
    }
}

export const dispatchToast = ({ type, message, router }: MessageResponse & { router?: AppRouterInstance }) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'info':
            toast.info(message);
            break;
        case 'warning':
            toast.warning(message);
            break;
        case 'redirect':
            router && router.push(message);
            break;
        default:
            toast(message);
            break;
    }
};
