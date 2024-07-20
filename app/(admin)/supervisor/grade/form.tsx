import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useGrades } from './context';
import { FormField } from '@/app/components/input/textInput';
import CustomButton from '@/app/components/button';
import Textarea from '@/app/components/input/textarea';
import { useSupervisorProfile } from '../context';

// const GradeSchema = Yup.object().shape({
//     gradeId: Yup.string().required('Grade ID is required'),
//     introduction: Yup.number().min(0).max(10).required('Introduction score is required'),
//     reviewLit: Yup.number().min(0).max(10).required('Review of Literature score is required'),
//     researchMethod: Yup.number().min(0).max(10).required('Research Method score is required'),
//     dataAnalysis: Yup.number().min(0).max(10).required('Data Analysis score is required'),
//     discussion: Yup.number().min(0).max(10).required('Discussion score is required'),
//     language: Yup.number().min(0).max(10).required('Language score is required'),
//     reference: Yup.number().min(0).max(10).required('Reference score is required'),
//     formart: Yup.number().min(0).max(10).required('Format score is required'),
//     total: Yup.number().required('Total score is required'),
//     generalComment: Yup.string().required('General comment is required'),
//     evaluator: Yup.string().required('Evaluator name is required'),
// });

interface IProps {
    gradeId: any
}

const AddGradeForm = ({ gradeId }: IProps) => {
    const { addGrade, loading } = useGrades();
    const { profile } = useSupervisorProfile()



    return (
        <Formik
            initialValues={{
                introduction: 0,
                reviewLit: 0,
                researchMethod: 0,
                dataAnalysis: 0,
                discussion: 0,
                language: 0,
                reference: 0,
                formart: 0,
                generalComment: "",
            }}
            // validationSchema={GradeSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                const payload = { ...values, gradeId, evaluator: profile?.name }
                await addGrade(payload as any);
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className='flex gap-4 '>
                        <FormField label="Introduction" name="introduction" type="number" className="my-4 w-full" />
                        <FormField label="Review of Literature" name="reviewLit" type="number" className="my-4 w-full" />
                    </div>


                    <div className='flex gap-4 '>

                        <FormField label="Research Method" name="researchMethod" type="number" className="my-4  w-full" />
                        <FormField label="Data Analysis" name="dataAnalysis" type="number" className="my-4 w-full" />

                    </div>

                    <div className='flex gap-4 '>

                        <FormField label="Discussion" name="discussion" type="number" className="my-4 w-full" />
                        <FormField label="Language" name="language" type="number" className="my-4 w-full" />

                    </div>

                    <div className='flex gap-4 '>


                        <FormField label="Reference" name="reference" type="number" className="my-4 w-full " />
                        <FormField label="Format" name="formart" type="number" className="my-4 w-full" />
                    </div>

                    <Textarea
                        id="comment"
                        name="generalComment"
                        label="Comment"
                        rows={4}
                    />




                    <CustomButton type="submit" disabled={isSubmitting} loading={loading}>
                        Submit
                    </CustomButton>
                </Form>
            )}
        </Formik>
    );
};

export default AddGradeForm;
