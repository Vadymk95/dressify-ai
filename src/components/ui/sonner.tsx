import { Toaster as Sonner, ToasterProps } from 'sonner';

export function Toaster(props: ToasterProps) {
    return (
        <Sonner
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-l-4 group-[.toaster]:border-amber-500 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg',
                    description: 'group-[.toast]:text-gray-600',
                    actionButton:
                        'group-[.toast]:bg-gradient-to-r group-[.toast]:from-amber-500 group-[.toast]:to-amber-600 group-[.toast]:text-white group-[.toast]:shadow-sm group-[.toast]:rounded-md',
                    cancelButton:
                        'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-700 group-[.toast]:hover:bg-gray-200',
                    error: 'group-[.toaster]:!bg-white group-[.toaster]:!border-l-4 group-[.toaster]:!border-red-500 group-[.toaster]:text-red-600 group-[.toaster]:shadow-lg data-[type=error]:border-red-500',
                    success:
                        'group-[.toaster]:!bg-white group-[.toaster]:!border-l-4 group-[.toaster]:!border-green-500 group-[.toaster]:text-green-600 group-[.toaster]:shadow-lg data-[type=success]:border-green-500',
                    info: 'group-[.toaster]:!bg-white group-[.toaster]:!border-l-4 group-[.toaster]:!border-amber-500 group-[.toaster]:text-amber-600 group-[.toaster]:shadow-lg data-[type=info]:border-amber-500'
                },
                ...props.toastOptions
            }}
            {...props}
        />
    );
}
