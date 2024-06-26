'use client'
import axios from 'axios';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'universal-cookie';

interface ResearcherProfile {
    id: string;
    name: string;
    email: string;
    phone: string,
    season: string;
    supervisor: string;
    role: string;
    male: string;

}

interface ResearcherProfileContextProps {
    profile: ResearcherProfile | null;
    loading: boolean;
    error: string | null;
    fetchProfile: () => void;
}

const ResearcherProfileContext = createContext<ResearcherProfileContextProps | undefined>(undefined);

interface IProps {
    children: React.ReactNode;
}

export const ResearcherProfileProvider: React.FC<IProps> = ({ children }) => {
    const [profile, setProfile] = useState<ResearcherProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const cookies = new Cookies();

    const port = "https://research-corridor.onrender.com/api";
    const token = cookies.get("token");

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


    return (
        <ResearcherProfileContext.Provider value={{ profile, loading, error, fetchProfile }}>
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
