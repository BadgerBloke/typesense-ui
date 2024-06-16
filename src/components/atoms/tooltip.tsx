import { Tooltip as TooltipPrimitive, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface TooltipProps {
    children: React.ReactNode;
    message: string | React.ReactNode;
    hidden?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ children, message, hidden }) => (
    <TooltipProvider>
        <TooltipPrimitive>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent hidden={hidden}>
                <p>{message}</p>
            </TooltipContent>
        </TooltipPrimitive>
    </TooltipProvider>
);

export default Tooltip;
