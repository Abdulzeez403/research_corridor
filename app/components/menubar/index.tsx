import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"

export function MenubarComponent() {
    return (
        <Menubar className="bg-transparent border-none">
            <MenubarMenu>
                <MenubarTrigger>Home</MenubarTrigger>

            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <Link href="/about">About</Link></MenubarTrigger>

            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <Link href="/about">About</Link>
                </MenubarTrigger>

            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <Link href="/about">About</Link>

                </MenubarTrigger>

            </MenubarMenu>
        </Menubar>
    )
}
