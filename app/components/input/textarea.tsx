import React from 'react';
import { useField } from 'formik';

interface TextareaProps {
    id: string;
    name: string;
    rows?: number;
    label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ id, name, rows = 4, label }) => {
    const [field, meta] = useField(name);

    return (
        <div className="my-4">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <textarea
                id={id}
                {...field}
                className={`mt-1 block w-full p-2 border rounded ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'}`}
                rows={rows}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Textarea;
