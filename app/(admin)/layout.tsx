import { MainLayout } from "./mainlayout";
import { ResearcherProfileProvider } from "./researcher/profile/context";
import { SupervisorProfileProvider } from "./supervisor/context";

interface IProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {
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
