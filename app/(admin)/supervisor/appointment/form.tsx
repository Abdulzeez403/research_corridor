import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useAppointments } from '../../researcher/meeting/context';
import { FormField } from '@/app/components/input/textInput';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@radix-ui/react-label';
import { useResearchers } from '../researcher/context';

interface AppointmentFormValues {
    researcherId: string;
    date: string;
    time: string;
    agenda: string;
}

const initialValues: AppointmentFormValues = {
    researcherId: '',
    date: '',
    time: '',
    agenda: '',
};

const validationSchema = Yup.object({
    researcherId: Yup.string().required('Researcher ID is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    agenda: Yup.string().required('Agenda is required'),
});

const AppointmentForm: React.FC = () => {

    const { createAppointment } = useAppointments()
    const { researchers: assignedResearchers, loading, error } = useResearchers()
    const [selectedResearcher, setSelectedResearcher] = useState('')

    const handleSubmit = (value: any) => {
        createAppointment(value)

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
                        <div className="w-full">
                            <Label className='font-semibold'>Select Researcher</Label>
                            <Select onValueChange={(val: any) => setSelectedResearcher(val)}>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select Researcher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {loading && <SelectItem value="loading" disabled >Loading...</SelectItem>}
                                    {error && <SelectItem value="error" disabled >Error loading researchers</SelectItem>}
                                    {assignedResearchers && assignedResearchers.length > 0 ? (
                                        assignedResearchers.map((r: any) => (
                                            <SelectItem key={r.id} value={r.id}>
                                                {r.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="no-researchers" disabled>No researchers available</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                    <div>
                        <FormField label="Date" name="date" className="my-4" type="date" />
                    </div>
                    <div>
                        <FormField label="Time" name="time" className="my-4" type="time" />
                    </div>
                    <div>
                        <FormField label="Agenda" name="agenda" className="my-4" type="text" />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="w-full mt-4 bg-customPrimary text-customSecondary hover:bg-slate-300"
                            disabled={isSubmitting} >
                            Create Appointment

                        </Button>

                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AppointmentForm;
