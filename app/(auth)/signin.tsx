// components/AdminForm.tsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormField } from '@/app/components/input/textInput';
import CustomButton from '../components/button/index';
import { useAuthContext } from './context';
import { useRouter } from 'next/navigation';

interface UserFormValues {
    emailOrMatric: string;
    password: string;

}

const UserFormValues = Yup.object().shape({
    emailOrMatric: Yup.string()
        .required('Required'),

    password: Yup.string()
        .min(8, 'Password too short!')
        .required('Required'),

});

export const SignInForm: React.FC = () => {


    const { signIn, loading } = useAuthContext();
    const router = useRouter();


    const initialValues: UserFormValues = {
        emailOrMatric: '',
        password: '',

    };

    const handleSubmit = async (values: UserFormValues) => {
        try {
            await signIn(values);
            console.log(values);
        } catch (error) {
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
                    <Form>

                        <FormField label="EmailOrMatric" name="emailOrMatric" className="my-4" />
                        <FormField label="Password" name="password" type="password" />
                        <CustomButton type="submit" loading={loading}>
                            SignUp
                        </CustomButton>
                    </Form>
                )}
            </Formik>
        </div>

    );
};
