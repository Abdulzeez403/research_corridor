
"use client"
import React, { useState } from "react"
import { SignInForm } from "./(auth)/signin"
import { SignUpForm } from "./(auth)/signup"
import Image from 'next/image'
import Link from 'next/link'
export const SignDetiail = () => {

    const [authLogin, setAuthLogin] = useState(false)
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[450px] gap-6">

                    <div>
                        {
                            authLogin ? (
                                <SignInForm />
                            ) : (
                                <SignUpForm />

                            )
                        }
                    </div>

                    <div className="mt-4 text-center text-sm"
                        onClick={() => setAuthLogin(!authLogin)}>
                        Don&apos;t have an account?{" "}

                        <span className="text-customPrimary text-semibold">{authLogin ? "Sign Up" : "Sign In"}</span>

                    </div>


                </div>
            </div>


            <div className="hidden bg-muted lg:block">
                <Image
                    src="/researcher.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>

        </div>
    )
}