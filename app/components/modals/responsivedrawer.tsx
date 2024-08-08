// components/ResponsiveDrawerDialog.tsx
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/app/components/hooks/use-media-query';

interface ResponsiveDrawerDialogProps {
    title: string;
    description: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    buttonVariant?: string;
    dialogClassName?: string;
    drawerClassName?: string;
}

export const ResponsiveDrawerDialog: React.FC<ResponsiveDrawerDialogProps> = ({
    title,
    description,
    children,
    isOpen,
    onClose,
    dialogClassName = "sm:max-w-[500px]",
    drawerClassName = "",
}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");


    // if (isDesktop) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* <DialogTrigger asChild>
                    <Button variant={buttonVariant}>{buttonLabel}</Button>
                </DialogTrigger> */}
            <DialogContent className={dialogClassName}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
    // }

    // return (
    //     <Drawer open={isOpen} onOpenChange={onClose}>
    //         {/* <DrawerTrigger asChild>
    //             <Button variant={buttonVariant}>{buttonLabel}</Button>
    //         </DrawerTrigger> */}
    //         <DrawerContent className={drawerClassName}>
    //             <DrawerHeader className="text-left">
    //                 <DrawerTitle>{title}</DrawerTitle>
    //                 <DrawerDescription>{description}</DrawerDescription>
    //             </DrawerHeader>
    //             {children}
    //             <DrawerFooter className="pt-2">
    //                 <DrawerClose asChild>
    //                     <Button variant="outline">Cancel</Button>
    //                 </DrawerClose>
    //             </DrawerFooter>
    //         </DrawerContent>
    //     </Drawer>
    // );
};
