"use client"
import { MainLayout } from "./mainlayout";
import { ResearcherProfileProvider } from "./researcher/profile/context";
import { SupervisorProfileProvider } from "./supervisor/context";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {
    const cookie = new Cookies()
    const router = useRouter()
    useEffect(() => {

        const token = cookie.get("token");
        if (!token) {
            router.push('/');
            console.log(token)
        }
    }, [])
    return (
        <div className="h-screen w-screen ">
            <ResearcherProfileProvider>
                <SupervisorProfileProvider>
                    <MainLayout>
                        <div className="h-full">
                            {children}
                        </div>
                    </MainLayout>
                </SupervisorProfileProvider>
            </ResearcherProfileProvider>

        </div>
    );
}
