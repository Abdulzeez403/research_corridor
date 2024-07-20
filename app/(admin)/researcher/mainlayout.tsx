"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Bell,
    CircleUser,
    Menu,
    Package2,
    LayoutDashboard,
    Presentation,
    Upload,
    CircleUserRound,
    MessageSquareQuote,
    BadgeCheck,
    Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer';
import { useAuthContext } from '@/app/(auth)/context';
import { useNotifications } from './notificaton/context';
import { Notifications } from './notificaton/detail';
import ValidateTopicForm from './validation/form';


interface IProp {
    children: React.ReactNode;
}

interface NavLinkProps {
    href: string;
    icon: any;
    children: React.ReactNode;
}

export const MainLayout = ({ children }: IProp) => {
    const urlPath = usePathname();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { signOut } = useAuthContext()

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const handleOpen = () => {
        setDrawerOpen(true)
    }

    const handleSignOut = () => {
        signOut();

    };
    const { newNotification } = useNotifications();
    const NavLink = ({ href, icon: Icon, children }: NavLinkProps) => {
        const isActive = urlPath === href;

        return (
            <Link
                href={href}
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-customPrimary hover:text-foreground ${isActive ? "bg-customPrimary text-white" : ""}`}>
                <Icon className="h-5 w-5" />
                {children}
            </Link>
        );
    };
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]  ">


            <div className="hidden border-r bg-muted/40 md:block ">
                <div className="flex h-full max-h-screen flex-col gap-2 ">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-customPrimary">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6 text-customSecondary" />
                            <span className="text-customSecondary">Research Corridor</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-lg bg-white relative">
                                        <Bell className="h-4 w-4 text-customPrimary" />
                                        {newNotification && (
                                            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                                        )}
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel className="text-center">Notifications</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Notifications />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavLink href="/researcher" icon={LayoutDashboard}>
                                Dashboard
                            </NavLink>

                            <NavLink href="/researcher/validation" icon={BadgeCheck}>
                                Topic Validation
                            </NavLink>

                            <NavLink href="/researcher/upload" icon={Upload}>
                                Upload Document
                            </NavLink>
                            <NavLink href="/researcher/meeting" icon={Presentation}>
                                Appointment
                            </NavLink>

                            <NavLink href="/researcher/chat" icon={MessageSquareQuote}>
                                ChatRoom
                            </NavLink>

                            <NavLink href="/researcher/profile" icon={CircleUserRound}>
                                Profile
                            </NavLink>
                        </nav>
                    </div>

                </div>
            </div>


            <div className="flex flex-col overflow-hidden">
                <header className="flex h-14 items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6 bg-customPrimary ">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">


                            <div className="flex-1">
                                <nav className="grid gap-2 text-lg font-medium">
                                    <NavLink href="/researcher" icon={LayoutDashboard}>
                                        Dashboard
                                    </NavLink>

                                    <NavLink href="/researcher/validation" icon={Presentation}>
                                        Topic Validation
                                    </NavLink>

                                    <NavLink href="/researcher/upload" icon={Upload}>
                                        Upload Document
                                    </NavLink>
                                    <NavLink href="/researcher/meeting" icon={Presentation}>
                                        Appointment
                                    </NavLink>

                                    <NavLink href="/researcher/chat" icon={MessageSquareQuote}>
                                        ChatRoom
                                    </NavLink>

                                    <NavLink href="/researcher/progess" icon={Presentation}>
                                        Progress
                                    </NavLink>

                                    <NavLink href="/researcher/grade" icon={Presentation}>
                                        Grading
                                    </NavLink>
                                    <NavLink href="/researcher/profile" icon={CircleUserRound}>
                                        Profile
                                    </NavLink>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>



                    <Button className="rounded-lg bg-black text-white" onClick={handleOpen}>
                        Validation
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-lg bg-white">
                                <CircleUser className="h-5 w-5 text-customPrimary " />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => handleSignOut()}
                            >Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="p-4 overflow-y-auto  flex-1">

                    {children}
                </main>
                <ResponsiveDrawerDialog
                    title="Validate Your Topic"
                    description="validate Your Topic"
                    isOpen={isDrawerOpen}
                    onClose={handleClose}
                >
                    <div>
                        <ValidateTopicForm />
                    </div>


                </ResponsiveDrawerDialog>
            </div>
        </div>
    );
};
