import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { FormField } from '@/app/components/input/textInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import CustomButton from '../components/button/index';
import { useAuthContext } from './context';
import { IResearcher, ISupervisor } from '@/constant/models';



// const researcherValidationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
//     role: Yup.string().required('Role is required'),
//     matric: Yup.string().required('Matric is required').nullable(),
//     department: Yup.string().required('Department is required').nullable(),
//     phone: Yup.string().required('Phone is required').nullable(),
//     season: Yup.string().required('Season is required').nullable(),
//     supervisor: Yup.string().required('Supervisor is required').nullable(),
//     gender: Yup.string().required('gender is required').nullable()
// });

export const ResearchSignUpForm: React.FC = () => {
    const researcherInitialValues: any = {
        name: '',
        password: '',
        email: '',
        matric: '',
        role: "Researcher",
        department: '',
        phone: '',
        season: '',
        supervisor: '',
        gender: "Male"
    };


    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedSupervisor, setSelectedSupervisor] = useState('')
    const [selectedDept, setSelectedDept] = useState('Educational Technology')


    const { researcherSignup, loading, getSeasons, getSupervisors, seasons, supervisors, getDepartments, departments } = useAuthContext();




    const handleSubmit = (values: any) => {

        const payload = { ...values, season: selectedSeason, supervisor: selectedSupervisor, department: selectedDept };
        researcherSignup(payload);
        console.log(payload);
    };

    useEffect(() => {
        getSeasons(),
            getSupervisors(selectedDept)
        getDepartments()
    }, [selectedDept])


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
                initialValues={researcherInitialValues}
                // validationSchema={researcherValidationSchema}
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
                        <div>
                            <div className="block  md:flex md:gap-x-2 md:items-center lg:flex lg:gap-x-2 lg:items-center">
                                <div className="w-full">
                                    <Label className='font-semibold'>Select Supervisor</Label>
                                    <Select onValueChange={(val: any) => {
                                        setSelectedSupervisor(val)
                                    }
                                    }>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select Supervisor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.isArray(supervisors) && supervisors.length > 0 ? (
                                                supervisors.map((supervisor: any) => (
                                                    <SelectItem key={supervisor._id} value={supervisor._id}>
                                                        {supervisor.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <div>No supervisors available.</div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormField label="Reg No:" name="matric" className="my-4 w-full" />
                            </div>

                            <div className="w-full">
                                <Label className='font-semibold'>Select Session</Label>
                                <Select onValueChange={(val: any) => {
                                    setSelectedSeason(val);
                                }}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select Session" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {loading ? (
                                            <h4>Loading...</h4>
                                        ) : (
                                            <div>

                                                {Array.isArray(seasons) && seasons.length > 0 ? (
                                                    seasons.map((season: any) => (
                                                        <SelectItem key={season.id} value={season.season}>
                                                            {season.season}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <div>No seasons available.</div>
                                                )}
                                            </div>

                                        )}

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
