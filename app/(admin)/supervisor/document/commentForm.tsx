import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSupervisorDocuments } from './context';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CustomButton from '@/app/components/button';

interface IProp {
    documentId: string;
}

export const CommentForm: React.FC<IProp> = ({ documentId }) => {
    const { commentOnDocument } = useSupervisorDocuments();
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment is required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (id) {
                await commentOnDocument(id, values.comment);
            }
            resetForm();
            setSubmitting(false);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-full max-w-lg mx-auto my-4 p-4 border rounded">
            <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    Comment
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment}
                    className={`mt-1 block w-full p-2 border rounded ${formik.touched.comment && formik.errors.comment ? 'border-red-500' : 'border-gray-300'}`}
                    rows={4}
                />
                {formik.touched.comment && formik.errors.comment ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.comment}</div>
                ) : null}
            </div>
            <CustomButton type="submit" loading={formik.isSubmitting}>
                Submit
            </CustomButton>
        </form>
    );
};

export default CommentForm;
