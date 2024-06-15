import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Calendar } from '@/components/ui/calendar'; // Adjust the import based on your project structure

interface DatePickerProps {
    name: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ name }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const [date, setDate] = React.useState<Date | undefined>(new Date(field.value));

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        setFieldValue(name, newDate);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="joiningdate">{ }</label>
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                className="rounded-md border"
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default DatePicker;
