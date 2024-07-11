import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '@/app/components/button/index';
import MultiSelect from '@/app/components/selector';
import { useAuthContext } from '@/app/(auth)/context';
import { useUploadTopic } from './context';
import { FormField } from '@/app/components/input/textInput';

interface FormValues {
    title: string;
    supervisorIds: string[];
    document: File | null;
}



const ValidateTopicForm: React.FC = () => {
    // Validation schema
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        supervisorIds: Yup.array().of(Yup.string().required()).min(1, 'At least one supervisor is required'),
        document: Yup.mixed().required('File is required'),
    });

    const { uploadTopic, loading } = useUploadTopic();
    const { supervisors, getSupervisors } = useAuthContext();
    const [fileName, setFileName] = useState<string>('No file chosen');


    useEffect(() => {
        getSupervisors("Educational Technology");
    }, []);

    const handleSubmit = async (values: FormValues, { resetForm }: any) => {
        if (values.document) {  // Ensure the file is not null
            try {
                await uploadTopic(values.title, values.supervisorIds, values.document);
                setFileName('No file chosen');

                resetForm();
            } catch (error) {
                console.error('Error uploading topic:', error);
            }
        } else {
            console.error('File is required.');
        }
    };

    return (
        <Formik
            initialValues={{ title: '', supervisorIds: [], document: null }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form className="w-full  px-4">
                    <div className="mb-4 ">
                        <FormField label="Title" name="title" className="w-full px-3 py-2  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />

                        <div className="my-4 w-full">
                            <label htmlFor="supervisorIds" className="block text-sm font-medium text-gray-700">Supervisors</label>
                            <MultiSelect
                                options={supervisors?.map((supervisor: any) => ({
                                    value: supervisor._id,
                                    label: supervisor.name,
                                }))}
                                selectedOptions={values.supervisorIds}
                                onChange={(selected) => setFieldValue('supervisorIds', selected)}
                            />
                            <ErrorMessage name="supervisorIds" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        <div className="my-4 w-full">
                            <label htmlFor="file" className="text-sm font-medium text-gray-700 hidden">File</label>
                            <div className="mt-2 flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('file')?.click()}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Choose File
                                </button>
                                <span className="text-sm text-gray-500">
                                    {fileName}
                                </span>
                            </div>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                className="hidden"
                                onChange={(event) => {
                                    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                    setFieldValue('document', file);
                                    setFileName(file ? file.name : 'No file chosen');
                                }}
                            />
                            <ErrorMessage name="file" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <CustomButton type="submit" disabled={loading}>
                            {loading ? 'Uploading...' : 'Upload'}
                        </CustomButton>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ValidateTopicForm;
