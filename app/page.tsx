"use client"
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignDetail } from "./detiail";

export default function Home() {
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

        <main className="">
            <SignDetail />
        </main>
    );
}
