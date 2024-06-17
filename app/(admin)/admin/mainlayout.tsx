"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {
    Bell,
    CircleUser,
    Home,
    Menu,
    Package2,
    Search,
    LayoutDashboard,
    TicketCheck,
    Presentation,
    Upload,
    CircleUserRound,
    MessageSquareQuote
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
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';


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

    const [role, setRole] = useState("Supervisor")


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
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]">


            <div className="hidden border-r bg-muted/40 md:block ">
                <div className="flex h-full max-h-screen flex-col gap-2 ">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-customPrimary">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6 text-customSecondary" />
                            <span className="text-customSecondary">Research Corridor</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>


                    <div className="flex-1 ">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavLink href="/admin" icon={LayoutDashboard}>
                                Dashboard
                            </NavLink>

                            <NavLink href="/admin/upload" icon={Upload}>
                                {role === "Researcher" ? " Upload Document" : "Validation"}
                            </NavLink>

                            {/* <NavLink href="#" icon={TicketCheck}>
                                Validation
                            </NavLink> */}
                            <NavLink href="/admin/meeting" icon={Presentation}>
                                Meeting
                            </NavLink>

                            <NavLink href="/admin/chat" icon={MessageSquareQuote}>
                                ChatRoom
                            </NavLink>
                            <NavLink href="/admin/profile" icon={CircleUserRound}>
                                Profile
                            </NavLink>
                        </nav>
                    </div>

                </div>
            </div>


            <div className="flex flex-col">
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
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold "
                                >
                                    <Package2 className="h-6 w-6 text-customPrimary" />
                                    <span className="text-customPrimary">Research Gate</span>
                                </Link>
                                <NavLink href="#" icon={Home}>
                                    Dashboard
                                </NavLink>

                                <NavLink href="#" icon={Home}>
                                    Upload Document
                                </NavLink>

                                <NavLink href="#" icon={Home}>
                                    Validation
                                </NavLink>
                                <NavLink href="#" icon={Home}>
                                    Meeting
                                </NavLink>
                                <NavLink href="#" icon={Home}>
                                    Profile
                                </NavLink>

                            </nav>
                            {/* <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upgrade to Pro</CardTitle>
                                        <CardDescription>
                                            Unlock all features and get unlimited access to our
                                            support team.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full">
                                            Upgrade
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div> */}
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1 ">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search researcher...."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
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
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="p-4 flex-1">

                    {children}
                </main>
            </div>
        </div>
    );
};
