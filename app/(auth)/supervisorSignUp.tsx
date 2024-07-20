import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { FormField } from '@/app/components/input/textInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import CustomButton from '../components/button/index';
import { useAuthContext } from './context';
import { ISupervisor } from '@/constant/models';

// Yup Validation Schemas
// const supervisorValidationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
//     role: Yup.string().required('Role is required'),
//     prefix: Yup.string().required('Prefix is required'),
//     gender: Yup.string(),
//     department: Yup.string(),
//     phone: Yup.string()
// });

export const SupervisorSignUpForm: React.FC = () => {
    const [selectedPrefix, setSelectedPrefix] = useState('');
    const [selectedDept, setSelectedDept] = useState('Educational Technology')

    const { supervisorSignup, loading, getSeasons, getSupervisors, seasons, getDepartments, departments } = useAuthContext();

    const supervisorInitialValues: ISupervisor = {
        name: '',
        password: '',
        email: '',
        role: 'Supervisor',
        department: '',
        phone: '',
        prefix: '',
        gender: 'Male'
    };

    const handleSubmit = (values: any) => {
        const payload = { ...values, prefix: selectedPrefix, department: selectedDept };
        supervisorSignup(payload);
        console.log(payload);
    };

    useEffect(() => {
        getSeasons();
        getSupervisors(selectedDept);
        getDepartments()
    }, []);

    const prefixOptions = [
        { id: 1, prefix: 'Dr' },
        { id: 2, prefix: 'Bsc' },
        { id: 3, prefix: 'Pro' }
    ];

    return (
        <div>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold text-customPrimary">Register</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your details below to create an account
                    </p>
                </div>
            </div>
            <Formik
                initialValues={supervisorInitialValues}
                // validationSchema={supervisorValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='mx-6 md:mx-0 lg:mx-0'>
                        <div className="block  md:flex md:gap-x-2 md:items-center lg:flex lg:gap-x-2 lg:items-center">
                            <FormField label="Name" name="name" className="my-4 w-full" />
                            <FormField label="Email" name="email" className="my-4 w-full" />
                        </div>

                        <div className="block  md:flex md:gap-x-2 md:items-center lg:flex lg:gap-x-2 lg:items-center">
                            <FormField label="Phone Number" name="phone" className="my-4 w-full" />

                            <div className='w-full'>
                                <Label>Select Department</Label>
                                <Select onValueChange={(val: any) => setSelectedDept(val)}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.isArray(departments) && departments.length > 0 ? (
                                            departments.map((item: any) => (
                                                <SelectItem key={item.id} value={item.department}>
                                                    {item.department}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div>No departments available.</div>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className='flex gap-x-2'>
                            <div className='w-full'>
                                <Label>Select Prefix</Label>
                                <Select onValueChange={(val: any) => setSelectedPrefix(val)}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select Prefix" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {prefixOptions.map((item) => (
                                            <SelectItem key={item.id} value={item.prefix}>
                                                {item.prefix}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        <FormField label="Password" name="password" className="my-4 w-full" />

                        <div>
                            <CustomButton type="submit" loading={loading}>
                                SignUp
                            </CustomButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
