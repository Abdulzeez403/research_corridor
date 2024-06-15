import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { FormField } from '@/app/components/input/textInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import CustomButton from '../components/button/index';

interface UserFormValues {
    name: string;
    password: string;
    matricNo: string;
    dept: string;
    phone: string;
    supervisor: string;
}

const UserFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password too short!')
        .required('Required'),
    supervisor: Yup.string()
        .required('Required')
});

export const SignUpForm: React.FC = () => {
    const initialValues: UserFormValues = {
        name: '',
        password: '',
        matricNo: '',
        dept: '',
        phone: '',
        supervisor: ''
    };

    const handleSubmit = (values: UserFormValues) => {
        // Handle form submission
        console.log(values);
    };

    const supervisorOptions = [
        { value: 'supervisor1', label: 'Supervisor 1' },
        { value: 'supervisor2', label: 'Supervisor 2' },
        { value: 'supervisor3', label: 'Supervisor 3' }
    ];

    const prefix = [
        {
            id: 1,
            prefix: "Dr"
        },
        {
            id: 2,
            prefix: "Mbs"
        },
        {
            id: 3,
            prefix: "Pro"
        }
    ]

    const Roles = [
        {
            id: 1,
            name: "Researcher"
        },
        {
            id: 2,
            name: "Supervisor"
        }
    ]
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedPrefix, setSelectedPrefix] = useState("")

    const [toggledRole, setToggleRole] = useState('');

    console.log(toggledRole)


    return (
        <div>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold text-customPrimary ">Register</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={UserFormSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="flex gap-x-2">
                            <FormField label="Name" name="name" className="my-4 w-full" />
                            <FormField label="Email" name="email" className="my-4 w-full" />
                        </div>

                        <div className="flex gap-x-2">



                            <FormField label="Phone Number" name="phone" className="my-4 w-full" />

                            <FormField label="Department" name="department" className="my-4 w-full" />
                        </div>


                        <div className='flex gap-x-2'>
                            <div className="w-full">
                                <Label>Select Roles!</Label>
                                <Select onValueChange={(val: any) => {
                                    setToggleRole(val)
                                    setSelectedRole(val)

                                }} className="w-full">
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Roles.map((item) => (
                                            <SelectItem key={item.id} value={item.name}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='w-full'>
                                <Label>Select Prefix!</Label>
                                <Select onValueChange={(val: any) => setSelectedPrefix(val)}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Dr" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {prefix.map((item) => (
                                            <SelectItem key={item.id} value={item.prefix}>
                                                {item.prefix}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>





                        {
                            toggledRole === "Researcher" && (
                                <div className="flex gap-x-2 items-center">

                                    <div className="w-full">
                                        <Label>Select Supervisor</Label>
                                        <Select onValueChange={(val: any) => {
                                            setSelectedRole(val)
                                        }}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select Supervisor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {supervisorOptions.map((supervisor) => (
                                                    <SelectItem key={supervisor.value} value={supervisor.value}>
                                                        {supervisor.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>


                                    <FormField label="Matric No:" name="matric" className="my-4 w-full" />

                                </div>

                            )
                        }







                        <FormField label="Password" name="password" className="my-4 w-full" />



                        <div>

                            <CustomButton type="submit" loading={isSubmitting}>
                                SignUp
                            </CustomButton>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>

    );
};
