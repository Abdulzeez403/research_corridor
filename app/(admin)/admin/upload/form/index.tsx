"use client"

import React, { useState } from 'react';
import { useDocumentContext } from '../context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormField } from '@/app/components/input/textInput';
import CustomButton from '@/app/components/button';

const ResearchUploadForm: React.FC = () => {
    const { uploadDocument, loading, error } = useDocumentContext();
    const [fileName, setFileName] = useState<string>('No file chosen');

    const initialValues = {
        title: '',
        document: null as File | null
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        document: Yup.mixed().required('A file is required')
    });

    const handleSubmit = async (values: { title: string; document: File | null }, { setSubmitting, resetForm }: any) => {
        if (values.title && values.document) {
            await uploadDocument(values.title, values.document);
            setFileName('No file chosen');
            resetForm();
        }
        setSubmitting(false);
    };

    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form>
                        <div>
                            <FormField label="Title" name="title" className="my-4 w-full" />
                        </div>
                        <div>
                            <label htmlFor="document" className=" text-sm font-medium text-gray-700 hidden">Document</label>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    name="document"
                                    id="document"
                                    className="hidden"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                        setFieldValue('document', file);
                                        setFileName(file ? file.name : 'No file chosen');
                                    }}

                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('document')?.click()}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Choose File
                                </button>
                                <span className="text-sm text-gray-500">{fileName}</span>
                            </div>
                            <ErrorMessage name="document" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <CustomButton type="submit" disabled={loading || isSubmitting}>
                                {loading || isSubmitting ? 'Uploading...' : 'Upload'}
                            </CustomButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ResearchUploadForm;

