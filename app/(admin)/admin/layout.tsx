import { MainLayout } from "./mainlayout";

interface IProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {
    return (
        <div className="h-screen w-screen ">
            <MainLayout>
                <div className="h-full">
                    {children}
                </div>
            </MainLayout>
        </div>
    );
}
