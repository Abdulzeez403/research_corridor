"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { IResearcher } from '@/constant/models';

interface ResearcherProfileContextProps {
    profile: IResearcher | null;
    loading: boolean;
    error: string | null;
    fetchProfile: () => void;
    fetchAppointments: () => void;
    fetchProgress: () => void;
    appointments: any[] | null;
    progress: number | null;
}

const ResearcherProfileContext = createContext<ResearcherProfileContextProps | undefined>(undefined);

interface IProps {
    children: React.ReactNode;
}

export const ResearcherProfileProvider: React.FC<IProps> = ({ children }) => {
    const [profile, setProfile] = useState<IResearcher | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [appointments, setAppointments] = useState<any[] | null>(null);
    const [progress, setProgress] = useState<number | null>(null);

    const cookies = new Cookies();
    const port = "https://research-corridor.onrender.com/api";
    const token = cookies.get("token");

    const appointmentsEndpoint = `${port}/researcher/appointments`;
    const progressEndpoint = `${port}/researcher/progress`;

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/researcher`, {
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

    const fetchAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(appointmentsEndpoint, {
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

    const fetchProgress = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(progressEndpoint, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setProgress(response.data.progress);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <ResearcherProfileContext.Provider value={{
            profile,
            loading,
            error,
            fetchProfile,
            fetchAppointments,
            fetchProgress,
            appointments,
            progress,
        }}>
            {children}
        </ResearcherProfileContext.Provider>
    );
};

export const useResearcherProfile = (): ResearcherProfileContextProps => {
    const context = useContext(ResearcherProfileContext);
    if (context === undefined) {
        throw new Error('useResearcherProfile must be used within a ResearcherProfileProvider');
    }
    return context;
};
