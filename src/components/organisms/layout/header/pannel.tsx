import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import { buttonVariants } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
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
            <SheetContent side="left" className="p-4">
                <div className="mb-4 flex w-full items-center justify-between">
                    <Link href="/" className="flex items-center gap-2" onClick={onClick}>
                        <Typography variant="large">MKSingh</Typography>
                    </Link>
                    <SheetClose asChild>{trigger}</SheetClose>
                </div>
                <ScrollArea className="h-[calc(100vh-120px)]">
                    {children}
                    <Separator className="my-1" />
                    <div className="my-5 ml-4 flex flex-wrap items-center gap-5">
                        <Link className={buttonVariants()} href="/login">
                            Log in
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SheetSide;
