import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuthContext } from '@/app/(auth)/context';
import { FormField } from '@/app/components/input/textInput';
import { useResearcherProfile } from '../context';
import { IResearcher } from '@/constant/models';
import CustomButton from '@/app/components/button';


const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    department: Yup.string().required('Department is required'),
    phone: Yup.string().required('Phone is required'),
    topic: Yup.string().required('topic is required'),
});


const ResearcherUpdateForm: React.FC = () => {

    const { updateResearcher } = useAuthContext();
    const { fetchProfile, profile } = useResearcherProfile()


    const handleSubmit = (values: any) => {
        updateResearcher(values)

    }

    useEffect(() => {
        fetchProfile()

    }, [])

    const initialValues: IResearcher = {
        name: profile?.name || '',
        email: profile?.email || '',
        gender: profile?.gender || '',
        department: profile?.department?.department as any || '',
        phone: profile?.phone || '',
        topic: profile?.topic || ''
    };





    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <FormField label="Name" name="name" className="my-4" />

                    </div>
                    <div>
                        <FormField label="Email" name="email" className="my-4" />
                    </div>


                    <div>
                        <FormField label="Gender" name="gender" className="my-4" />
                    </div>
                    <div>
                        <FormField label="Department" name="department" className="my-4" />
                    </div>

                    <div>
                        <FormField label="Topic" name="topic" className="my-4" />
                    </div>
                    <div>
                        <FormField label="Phone" name="phone" className="my-4" />
                    </div>
                    <CustomButton type="submit" disabled={isSubmitting}>
                        Update Researcher
                    </CustomButton>
                </Form>
            )}
        </Formik>
    );
};

export default ResearcherUpdateForm;
