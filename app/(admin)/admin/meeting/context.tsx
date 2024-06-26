"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

interface Appointment {
    id: string;
    date: string;
    time: string;
    // Add other appointment fields as necessary
}

interface AppointmentsContextProps {
    appointments: Appointment[] | null;
    loading: boolean;
    error: string | null;
    getAppointments: () => void;
}

const AppointmentsContext = createContext<AppointmentsContextProps | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const port = "https://research-corridor.onrender.com/api";
    const cookies = new Cookies();
    const token = cookies.get("token");

    const getAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/researcher/appointments`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setAppointments(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <AppointmentsContext.Provider value={{ appointments, loading, error, getAppointments }}>
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
