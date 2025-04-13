'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
    value: string;
    label: string;
}

export interface ComboboxProps {
    options: ComboboxOption[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
    disabled?: boolean;
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
    (
        {
            options,
            value,
            onValueChange,
            placeholder = 'Select an option...',
            emptyMessage = 'No option found.',
            disabled,
            className
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false);

        const handleSelect = (selectedValue: string) => {
            onValueChange(selectedValue === value ? '' : selectedValue);
            setOpen(false);
        };

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        disabled={disabled}
                        aria-expanded={open}
                        className={cn(
                            'w-full justify-between shadow-sm',
                            className
                        )}
                        ref={ref}
                    >
                        {value
                            ? options.find((option) => option.value === value)
                                  ?.label
                            : placeholder}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                {/* z-index less than header(z-50) */}
                <PopoverContent className="p-0 z-[49]">
                    <Command>
                        <CommandInput
                            placeholder={placeholder}
                            className="h-9"
                            onValueChange={() => {
                                // Сбрасываем скролл к началу списка при вводе
                                const commandList =
                                    document.querySelector('[cmdk-list]');
                                if (commandList) {
                                    commandList.scrollTop = 0;
                                }
                            }}
                        />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        // change option.label to option.value to fix the issue with filtering
                                        value={option.label}
                                        onSelect={(selectedLabel) => {
                                            const selectedOption = options.find(
                                                (opt) =>
                                                    opt.label === selectedLabel
                                            );
                                            if (selectedOption) {
                                                handleSelect(
                                                    selectedOption.value
                                                );
                                            }
                                        }}
                                    >
                                        {option.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === option.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);
