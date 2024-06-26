import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuthContext } from '@/app/(auth)/context';
import { FormField } from '@/app/components/input/textInput';

interface SupervisorUpdateFormValues {
    name: string;
    email: string;
    role: string;
    prefix: string;
    gender: string;
    department: string;
    phone: string;
}

const SupervisorUpdateForm: React.FC = () => {

    const initialValues: SupervisorUpdateFormValues = {
        name: '',
        email: '',
        role: 'supervisor',
        prefix: '',
        gender: '',
        department: '',
        phone: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        role: Yup.string().required('Role is required'),
        prefix: Yup.string().required('Prefix is required'),
        gender: Yup.string().required('Gender is required'),
        department: Yup.string().required('Department is required'),
        phone: Yup.string().required('Phone is required'),
    });
    const { updateResearcher, updateSupervisor } = useAuthContext()


    const handleSubmit = (values: any) => {
        updateSupervisor(values)

    }


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
                        <FormField label="Role" name="role" className="my-4" />
                    </div>
                    <div>

                        <FormField label="Prefix" name="prefix" className="my-4" />
                    </div>
                    <div>
                        <FormField label="Gender" name="gender" className="my-4" />
                    </div>
                    <div>
                        <FormField label="Department" name="department" className="my-4" />
                    </div>
                    <div>
                        <FormField label="Phone" name="phone" className="my-4" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Update Supervisor
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SupervisorUpdateForm;
