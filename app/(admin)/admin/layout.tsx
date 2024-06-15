import { MainLayout } from "./mainlayout";


interface IProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {

    return (
        <div>

            <MainLayout>
                <div className=' '>
                    {children}

                </div>
            </MainLayout>

        </div>
    );
}
