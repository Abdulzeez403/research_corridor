"use client"
import { MainLayout } from "./mainlayout";
import { ResearcherProfileProvider, useResearcherProfile } from "./researcher/profile/context";
import { SupervisorProfileProvider, useSupervisorProfile } from "./supervisor/context";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NotificationsProvider } from "./researcher/notificaton/context";
import { AssignedResearchersProvider } from "./supervisor/researcher/context";
import { SupervisorDocumentsProvider } from "./supervisor/document/context";
import { ValidationRequestsProvider } from "./supervisor/validation/context";
import { GradesProvider } from "./supervisor/grade/context";
import { ProgressProvider } from "./supervisor/progress/context";

interface IProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {
    const cookie = new Cookies()
    const router = useRouter();


    const { fetchProfile: fetchSupervisorProfile, profile: supervisorProfile } = useSupervisorProfile();
    const { fetchProfile: fetchResearcherProfile, profile: researcherProfile } = useResearcherProfile();

    useEffect(() => {
        const fetchData = async () => {
            const token = await cookie.get("token");
            if (!token) {
                router.push('/');
                console.log(token);
                return;
            }

            fetchSupervisorProfile();
            fetchResearcherProfile();
        };

        fetchData();
    }, [router]);
    return (
        <div className="h-screen w-screen ">

            <AssignedResearchersProvider>
                <SupervisorDocumentsProvider>
                    <ValidationRequestsProvider>
                        <GradesProvider>
                            <NotificationsProvider>
                                <ProgressProvider>
                                    <MainLayout>
                                        <div className="h-full">
                                            {children}
                                        </div>
                                    </MainLayout>
                                </ProgressProvider>

                            </NotificationsProvider>
                        </GradesProvider>

                    </ValidationRequestsProvider>

                </SupervisorDocumentsProvider>

            </AssignedResearchersProvider>


        </div>
    );
}
