import React from 'react'
import Image from "next/image"
import User from "../../../../public/student.jpg"

export const ProfileDetail = () => {
    return (
        <div>
            <div className="flex gap-x-10">
                <Image src={User} alt="UserImage" width={300} height={300} className="rounded-lg" />
                <div >
                    <h4 className="font-bold border-b-2 border-customPrimary pb-4">Personal Information</h4>


                    <div className='flex gap-x-30'>
                        <h4 className="font-bold text-md">Name: Abdulazeez Sodiq (Researcher)</h4>
                        <h4>PhoneNumber: 0818438484839</h4>
                    </div>

                    <div>

                    </div>
                </div>

            </div>

        </div >
    )
}

