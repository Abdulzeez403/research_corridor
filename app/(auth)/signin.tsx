// components/AdminForm.tsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { FormField } from '@/app/components/input/textInput';
import CustomButton from '../components/button/index';

interface UserFormValues {
    Name: string;
    password: string;

}

const UserFormValues = Yup.object().shape({
    Name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

    password: Yup.string()
        .min(8, 'Password too short!')
        .required('Required'),

});

export const SignInForm: React.FC = () => {
    const initialValues: UserFormValues = {
        Name: '',
        password: '',

    };

    const handleSubmit = (values: UserFormValues) => {
        // Handle form submission
        console.log(values);
    };

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate an async operation
        setLoading(false);
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

                        <FormField label="Email" name="email" className="my-4" />
                        <FormField label="Password" name="password" type="password" />


                        <CustomButton onClick={handleClick} loading={loading}>
                            {loading ? 'Loading...' : 'LogIn'}
                        </CustomButton>
                    </Form>
                )}
            </Formik>
        </div>

    );
};
