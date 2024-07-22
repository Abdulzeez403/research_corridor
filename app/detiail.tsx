
"use client"
import React, { useState } from "react"
import Image from 'next/image'
import { ResearchSignUpForm } from "./(auth)/researcherSignUp"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupervisorSignUpForm } from "./(auth)/supervisorSignUp"
import { SignInForm } from "./(auth)/signin"
export const SignDetiail = () => {

    const [authLogin, setAuthLogin] = useState(false)
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] overflow-hidden">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[450px] gap-6">

                    <div>
                        {
                            authLogin ? (
                                <SignInForm />
                            ) : (

                                <Tabs defaultValue="Researcher" className=" pr-2">
                                    <TabsList className=" w-90 grid grid-cols-2">
                                        <TabsTrigger value="Researcher" className='focus:bg-customSecondary'>
                                            Researcher</TabsTrigger>
                                        <TabsTrigger value="Supervisor" className='active:bg-customSecondary'>
                                            Supervisor</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="Researcher">
                                        <ResearchSignUpForm />

                                    </TabsContent>

                                    <TabsContent value="Supervisor" >
                                        <SupervisorSignUpForm />


                                    </TabsContent>

                                </Tabs>


                            )
                        }
                    </div>
                    <div className="">
                        <span
                            className="cursor-pointer"
                            onClick={() => setAuthLogin(!authLogin)}
                        >
                            <div className="flex justify-center">

                                {authLogin ?
                                    (<h4>Dont have an account?
                                        <span className="text-customPrimary text-semibold pl-2">Sign Up </span>
                                    </h4>
                                    ) : (
                                        <h4 >
                                            Already have an account?
                                            <span className="text-customPrimary text-semibold  pl-2">Sign In</span>
                                        </h4>

                                    )
                                }
                            </div>

                        </span>
                    </div>


                </div>
            </div>


            <div className="hidden bg-muted lg:block">
                <Image
                    src="/researcher.jpg"
                    alt="Image"
                    width="1900"
                    height="1000"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    objectFit="cover"
                />
            </div>

        </div>
    )
}