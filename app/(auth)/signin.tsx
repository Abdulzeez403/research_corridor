

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { ResearcherSignInForm } from './researcherSignIn'
import { SuperviorSignInForm } from './supervisorSignIn'

export const SignInForm = () => {
    return (
        <Tabs defaultValue="Researcher" className=" pr-2">
            <TabsList className=" w-90 grid grid-cols-2">
                <TabsTrigger value="Researcher" className='focus:bg-customSecondary'>
                    Researcher</TabsTrigger>
                <TabsTrigger value="Supervisor" className='active:bg-customSecondary'>
                    Supervisor</TabsTrigger>
            </TabsList>

            <TabsContent value="Researcher">
                <ResearcherSignInForm />

            </TabsContent>

            <TabsContent value="Supervisor" >
                <SuperviorSignInForm />
            </TabsContent>

        </Tabs>
    )
}

