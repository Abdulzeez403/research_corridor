

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";


interface IProps {
    title: string;
}

export function DropdownComponents({ title }: IProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>{title}</Button>
                {/* <DropdownMenuShortcut>></DropdownMenuShortcut> */}

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
                <DropdownMenuItem className="text-center">
                    <Link href="/" className="text-center" >Home</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-center">
                    <Link href="/about" className="text-center" >About</Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
