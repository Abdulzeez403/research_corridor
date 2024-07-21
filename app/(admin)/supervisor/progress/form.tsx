import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePathname } from 'next/navigation';
import { useProgress } from './context';
import { useResearchers } from '../researcher/context';
import CustomButton from '@/app/components/button';


interface IProps {
    progressId: any;
}
export const ProgressForm = ({ progressId }: IProps) => {
    const urlPath = usePathname();
    const { addProgress } = useProgress();

    // useEffect(() => {

    //     getResearcherById(progressId as any);
    // }, []);

    const formik = useFormik({
        initialValues: {
            comment: '',
            percentage: 0,
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment is required'),
            percentage: Yup.number()
                .min(0, 'Percentage must be at least 0')
                .max(100, 'Percentage must be at most 100')
                .required('Percentage is required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            // const researcherId = urlPath.split('/')[3];
            const researcherId = progressId

            const payload = { ...values, progressId: researcherId };
            await addProgress(payload as any);
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
                    className={`mt-1 block w-full p-2 border rounded ${formik.touched.comment && formik.errors.comment ? 'border-red-500' : 'border-gray-300'
                        }`}
                    rows={4}
                />
                {formik.touched.comment && formik.errors.comment ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.comment}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                    Percentage
                </label>
                <input
                    id="percentage"
                    name="percentage"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.percentage}
                    className={`mt-1 block w-full p-2 border rounded ${formik.touched.percentage && formik.errors.percentage ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {formik.touched.percentage && formik.errors.percentage ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.percentage}</div>
                ) : null}
            </div>
            <CustomButton type="submit" loading={formik.isSubmitting}>
                Submit
            </CustomButton>
        </form>
    );
};

export default ProgressForm;
