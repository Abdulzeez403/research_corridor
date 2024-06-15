// components/FormField.tsx
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    id?: string;
    className?: any
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', id, className }) => {
    return (
        <div className={`${className}`}>
            <Label htmlFor={id || name}>{label}</Label>
            <Field as={Input} type={type} name={name} id={id || name} />
            <ErrorMessage name={name} component="div" className="text-red-600" />
        </div>
    );
};
