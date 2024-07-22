import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '@/app/(auth)/context';
import { FormField } from '@/app/components/input/textInput';
import { Button } from '@/components/ui/button';
import { useSupervisorProfile } from '../../context';
import CustomButton from '@/app/components/button';

interface SupervisorUpdateFormValues {
    name: string;
    email: string;
    prefix: string;
    gender: string;
    department: string;
    phone: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    prefix: Yup.string().required('Prefix is required'),
    gender: Yup.string().required('Gender is required'),
    department: Yup.string().required('Department is required'),
    phone: Yup.string().required('Phone is required'),
});

export const SupervisorUpdateForm: React.FC = () => {
    const { updateSupervisor, loading } = useAuthContext();
    const { fetchProfile, profile } = useSupervisorProfile()


    const handleSubmit = (values: any) => {
        updateSupervisor(values)
    }

    useEffect(() => {
        fetchProfile()

    }, [])
    const initialValues: SupervisorUpdateFormValues = {
        name: profile?.name || '',
        email: profile?.email || '',
        prefix: profile?.prefix || '',
        gender: profile?.gender || '',
        department: profile?.department?.department as any || '',
        phone: profile?.phone || '',
    };




    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="flex gap-x-2">
                        <FormField label="Name" name="name" className="my-4 w-full" />
                        <FormField label="Email" name="email" className="my-4 w-full" />
                    </div>

                    <div className="flex gap-x-2">

                        <FormField label="Prefix" name="prefix" className="my-4 w-full" />
                        <FormField label="Gender" name="gender" className="my-4 w-full" />

                    </div>
                    <div className="flex gap-x-2">
                        <FormField label="Department" name="department" className="my-4 w-full" />
                        <FormField label="Phone" name="phone" className="my-4 w-full" />
                    </div>


                    <CustomButton
                        type="submit"
                        loading={loading} >
                        Update Profile
                    </CustomButton>
                </Form>
            )}
        </Formik>
    );
};

export default SupervisorUpdateForm;
