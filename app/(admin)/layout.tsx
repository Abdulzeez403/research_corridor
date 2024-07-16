"use client"
import { MainLayout } from "./mainlayout";
import { ResearcherProfileProvider } from "./researcher/profile/context";
import { SupervisorProfileProvider } from "./supervisor/context";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NotificationsProvider } from "./researcher/notificaton/context";
import { AssignedResearchersProvider } from "./supervisor/researcher/context";
import { SupervisorDocumentsProvider } from "./supervisor/document/context";
import { ValidationRequestsProvider } from "./supervisor/validation/context";
import { GradesProvider } from "./supervisor/grade/context";

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
                    <AssignedResearchersProvider>
                        <SupervisorDocumentsProvider>
                            <ValidationRequestsProvider>

                                <GradesProvider>


                                    <NotificationsProvider>
                                        <MainLayout>
                                            <div className="h-full">
                                                {children}
                                            </div>
                                        </MainLayout>
                                    </NotificationsProvider>
                                </GradesProvider>

                            </ValidationRequestsProvider>

                        </SupervisorDocumentsProvider>

                    </AssignedResearchersProvider>


                </SupervisorProfileProvider>
            </ResearcherProfileProvider>

        </div>
    );
}
