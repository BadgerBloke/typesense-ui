import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent } from '~/components/ui/sheet';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

const SheetSide = ({
    children,
    trigger,
    open,
    onClick,
}: {
    children: React.ReactNode;
    trigger: JSX.Element;
    open: boolean;
    onClick: () => void;
}) => {
    return (
        <Sheet open={open} onOpenChange={onClick}>
            <SheetContent side="left" className="p-0">
                <div className="mb-4 flex w-full items-center justify-between p-4">
                    <Link href="/" className="flex items-center gap-2" onClick={onClick}>
                        <Typography variant="large">MKSingh</Typography>
                    </Link>
                    <SheetClose asChild>{trigger}</SheetClose>
                </div>
                <ScrollArea className="h-[calc(100vh-120px)] px-2">{children}</ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SheetSide;
