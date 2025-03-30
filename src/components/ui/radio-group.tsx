import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const radioGroupItemVariants = cva(
    'aspect-square h-5 w-5 rounded-full border-2 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-gray-500 text-gray-500 hover:border-gray-600 focus-visible:ring-gray-500',
                green: 'border-green-500 text-green-500 hover:border-green-600 focus-visible:ring-green-500',
                amber: 'border-amber-500 text-amber-500 hover:border-amber-600 focus-visible:ring-amber-500',
                red: 'border-red-500 text-red-500 hover:border-red-600 focus-visible:ring-red-500',
                blue: 'border-blue-500 text-blue-500 hover:border-blue-600 focus-visible:ring-blue-500'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

const radioGroupIndicatorVariants = cva(
    'h-2.5 w-2.5 rounded-full shadow-sm transition-transform scale-100',
    {
        variants: {
            variant: {
                default: 'bg-gray-500',
                green: 'bg-green-500',
                amber: 'bg-amber-500',
                red: 'bg-red-500',
                blue: 'bg-blue-500'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn('grid gap-2', className)}
            {...props}
            ref={ref}
        />
    );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioGroupItemProps
    extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
        VariantProps<typeof radioGroupItemVariants> {}

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    RadioGroupItemProps
>(({ className, variant, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(radioGroupItemVariants({ variant, className }))}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <div className={cn(radioGroupIndicatorVariants({ variant }))} />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
