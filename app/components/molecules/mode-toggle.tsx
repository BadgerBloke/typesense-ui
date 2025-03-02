import { Theme, useTheme } from 'remix-themes';
import { cva, type VariantProps } from 'class-variance-authority';
import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';

const toggleVariants = cva('shrink-0', {
    variants: {
        active: {
            false: 'text-muted-foreground',
        },
        size: {
            default: '',
            sm: 'size-6',
            lg: 'size-10',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const iconVariants = cva('h-[1.2rem] w-[1.2rem]', {
    variants: {
        size: {
            default: '',
            sm: '!size-3',
            lg: '!size-5',
        },
    },
});

interface ModeToggleProps extends VariantProps<typeof toggleVariants> {
    variant?: 'horiozntal' | 'dropdown';
}

const ModeToggle = ({ variant = 'dropdown', size }: ModeToggleProps) => {
    const [theme, setTheme, themeMetaData] = useTheme();

    switch (variant) {
        case 'horiozntal': {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant={themeMetaData.definedBy === 'SYSTEM' ? 'secondary' : 'ghost'}
                        size="icon"
                        className={cn(toggleVariants({ size, active: themeMetaData.definedBy === 'SYSTEM' }))}
                        onClick={() => setTheme(null)}
                    >
                        <Monitor className={cn(iconVariants({ size }))} />
                    </Button>
                    <Button
                        variant={themeMetaData.definedBy === 'USER' && theme === Theme.LIGHT ? 'secondary' : 'ghost'}
                        size="icon"
                        className={cn(toggleVariants({ size, active: theme === Theme.LIGHT && themeMetaData.definedBy === 'USER' }))}
                        onClick={() => setTheme(Theme.LIGHT)}
                    >
                        <Sun className={cn(iconVariants({ size }))} />
                    </Button>
                    <Button
                        variant={themeMetaData.definedBy === 'USER' && theme === Theme.DARK ? 'secondary' : 'ghost'}
                        size="icon"
                        className={cn(toggleVariants({ size, active: theme === Theme.DARK && themeMetaData.definedBy === 'USER' }))}
                        onClick={() => setTheme(Theme.DARK)}
                    >
                        <Moon className={cn(iconVariants({ size }))} />
                    </Button>
                </div>
            );
        }
        case 'dropdown':
        default: {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                            {themeMetaData.definedBy === 'SYSTEM' ? (
                                <Monitor className="h-[1.2rem] w-[1.2rem]" />
                            ) : theme === Theme.LIGHT ? (
                                <Sun className="h-[1.2rem] w-[1.2rem]" />
                            ) : (
                                <Moon className="h-[1.2rem] w-[1.2rem]" />
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>Light</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>Dark</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme(null)}>System</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
};

export default ModeToggle;
