import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useGrades } from './context';
import { FormField } from '@/app/components/input/textInput';

const GradeSchema = Yup.object().shape({
    gradeId: Yup.string().required('Grade ID is required'),
    introduction: Yup.number().min(0).max(10).required('Introduction score is required'),
    reviewLit: Yup.number().min(0).max(10).required('Review of Literature score is required'),
    researchMethod: Yup.number().min(0).max(10).required('Research Method score is required'),
    dataAnalysis: Yup.number().min(0).max(10).required('Data Analysis score is required'),
    discussion: Yup.number().min(0).max(10).required('Discussion score is required'),
    language: Yup.number().min(0).max(10).required('Language score is required'),
    reference: Yup.number().min(0).max(10).required('Reference score is required'),
    formart: Yup.number().min(0).max(10).required('Format score is required'),
    total: Yup.number().required('Total score is required'),
    generalComment: Yup.string().required('General comment is required'),
    evaluator: Yup.string().required('Evaluator name is required'),
});

const AddGradeForm: React.FC = () => {
    const { addGrade } = useGrades();

    return (
        <Formik
            initialValues={{
                gradeId: '',
                introduction: 0,
                reviewLit: 0,
                researchMethod: 0,
                dataAnalysis: 0,
                discussion: 0,
                language: 0,
                reference: 0,
                formart: 0,
                total: 0,
                generalComment: '',
                evaluator: '',
            }}
            validationSchema={GradeSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                await addGrade(values);
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <FormField label="Grade ID" name="gradeId" className="my-4" />
                    <FormField label="Introduction" name="introduction" type="number" className="my-4" />
                    <FormField label="Review of Literature" name="reviewLit" type="number" className="my-4" />
                    <FormField label="Research Method" name="researchMethod" type="number" className="my-4" />
                    <FormField label="Data Analysis" name="dataAnalysis" type="number" className="my-4" />
                    <FormField label="Discussion" name="discussion" type="number" className="my-4" />
                    <FormField label="Language" name="language" type="number" className="my-4" />
                    <FormField label="Reference" name="reference" type="number" className="my-4" />
                    <FormField label="Format" name="formart" type="number" className="my-4" />
                    <FormField label="Total" name="total" type="number" className="my-4" />
                    <FormField label="General Comment" name="generalComment" className="my-4" />
                    <FormField label="Evaluator" name="evaluator" className="my-4" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AddGradeForm;
