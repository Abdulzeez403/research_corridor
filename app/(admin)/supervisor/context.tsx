'use client'

import { ISupervisor } from '@/constant/models';
import axios from 'axios';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'universal-cookie';

interface SupervisorProfileContextProps {
    profile: ISupervisor | null;
    loading: boolean;
    error: string | null;
    fetchProfile: () => void;
}

const SupervisorProfileContext = createContext<SupervisorProfileContextProps | undefined>(undefined);

interface IProps {
    children: React.ReactNode;
}

export const SupervisorProfileProvider: React.FC<IProps> = ({ children }) => {
    const [profile, setProfile] = useState<ISupervisor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const cookies = new Cookies();

    const port = "https://research-corridor.onrender.com/api";
    const token = cookies.get("token");

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setProfile(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <SupervisorProfileContext.Provider value={{ profile, loading, error, fetchProfile }}>
            {children}
        </SupervisorProfileContext.Provider>
    );
};

export const useSupervisorProfile = (): SupervisorProfileContextProps => {
    const context = useContext(SupervisorProfileContext);
    if (context === undefined) {
        throw new Error('useSupervisorProfile must be used within a SupervisorProfileProvider');
    }
    return context;
};
