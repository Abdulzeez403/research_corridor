"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { notify } from '@/app/components/toast';

interface Appointment {
    _id?: string;
    researcherId: string;
    date: string;
    time: string;
    agenda: string; // Add other appointment fields as necessary
}

interface CreateAppointmentRequest {
    researcherId: string;
    date: string; // Expected format: "YYYY-MM-DD"
    time: string; // Expected format: "hh:mm AM/PM"
    agenda: string;
}

interface EditAppointmentRequest {
    appointmentId: string;
    date?: string; // Optional field to update date
    time?: string; // Optional field to update time
    agenda?: string; // Optional field to update agenda
}

interface DeleteAppointmentRequest {

    appointmentId: string;
}

interface AppointmentsContextProps {
    appointments: Appointment[] | null;
    loading: boolean;
    error: string | null;
    getAppointments: (season: any) => void;
    createAppointment: (data: CreateAppointmentRequest) => void;
    editAppointment: (data: EditAppointmentRequest) => void;
    deleteAppointment: (data: DeleteAppointmentRequest) => void;
}

const AppointmentsContext = createContext<AppointmentsContextProps | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const port = "https://research-corridor.onrender.com/api";
    const cookies = new Cookies();
    const token = cookies.get("token");

    const getAppointments = async (season: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor/appointments/${season}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setAppointments(response.data.appointments);

        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const createAppointment = async (data: CreateAppointmentRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${port}/supervisor/create-appointment`, data, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
            });
            setAppointments((prev) => (prev ? [...prev, response.data] : [response.data]));
            notify.success(response.data.msg)
            setLoading(false);

        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
            notify.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false);
        }
    };

    const editAppointment = async (data: EditAppointmentRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${port}/supervisor/update-appointment`, data, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
            });
            setAppointments((prev) =>
                prev ? prev.map((appointment) => (appointment._id === data.appointmentId ? response.data : appointment)) : [response.data]
            );
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteAppointment = async (data: DeleteAppointmentRequest) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${port}/supervisor/delete-appointment`, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
                data: data
            });
            notify.success("Deleted successfully")
            setAppointments((prev) =>
                prev ? prev.filter((appointment) => appointment._id !== data.appointmentId) : null
            );
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <AppointmentsContext.Provider value={{ appointments, loading, error, getAppointments, createAppointment, editAppointment, deleteAppointment }}>
            {children}
        </AppointmentsContext.Provider>
    );
};

export const useAppointments = (): AppointmentsContextProps => {
    const context = useContext(AppointmentsContext);
    if (context === undefined) {
        throw new Error('useAppointments must be used within an AppointmentsProvider');
    }
    return context;
};
