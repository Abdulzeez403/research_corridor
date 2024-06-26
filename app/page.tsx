"use client"
import Cookies from "universal-cookie";
import { SignDetiail } from "./detiail";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
            <SignDetiail />
        </main>
    );
}
