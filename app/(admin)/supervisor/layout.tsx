"use client"
import { MainLayout } from "./mainlayout";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


interface IProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {
    const cookie = new Cookies()
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = await cookie.get("token");
            if (!token) {
                router.push('/');
                console.log(token);
                return;
            }
        };

        fetchData()

    }, []);
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
