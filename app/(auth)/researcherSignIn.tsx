// components/AdminForm.tsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormField } from '@/app/components/input/textInput';
import CustomButton from '../components/button/index';
import { useAuthContext } from './context';
import { useRouter } from 'next/navigation';
import { notify } from '../components/toast';

interface UserFormValues {
    emailOrMatric: string;
    password: string;

}

const UserFormValues = Yup.object().shape({
    emailOrMatric: Yup.string()
        .required('Required'),

    password: Yup.string()
        // .min(8, 'Password too short!')
        .required('Required'),

});

export const ResearcherSignInForm: React.FC = () => {


    const { researcherSignIn } = useAuthContext();
    const [loading, setLoading] = useState(false)


    const initialValues: UserFormValues = {
        emailOrMatric: '',
        password: '',

    };

    const handleSubmit = async (values: UserFormValues) => {
        setLoading(true)
        try {
            await researcherSignIn(values);
            setLoading(true)

        } catch (error) {
            setLoading(false)
            console.error('Error during sign-in:', error);
        }
    };

    return (
        <div>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold text-customPrimary">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={UserFormValues}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='mx-6 md:mx-0 lg:mx-0'>

                        <FormField label="Email/Matric" name="emailOrMatric" className="my-4" />
                        <FormField label="Password" name="password" type="password" />
                        <CustomButton type="submit" loading={loading}>
                            SignIn
                        </CustomButton>
                    </Form>
                )}
            </Formik>
        </div>

    );
};
