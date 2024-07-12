// researchersContext.tsx
'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

interface Researcher {
    id: string;
    name: string;
    email: string;
    // Add other researcher fields as necessary
}

interface ResearchersContextProps {
    researchers: Researcher[];
    researcher: Researcher | null;
    loading: boolean;
    error: string | null;
    getResearchers: () => void;
    getResearcher: (id: string) => void;
}

const ResearchersContext = createContext<ResearchersContextProps | undefined>(undefined);

export const AssignedResearchersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [researchers, setResearchers] = useState<Researcher[]>([]);
    const [researcher, setResearcher] = useState<Researcher | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const port = "https://research-corridor.onrender.com/api";
    const cookies = new Cookies();
    const token = cookies.get("token");

    const getResearchers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor/get-researchers`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setResearchers(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getResearcher = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor/get-researchers/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setResearcher(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ResearchersContext.Provider value={{ researchers, researcher, loading, error, getResearchers, getResearcher }}>
            {children}
        </ResearchersContext.Provider>
    );
};

export const useResearchers = (): ResearchersContextProps => {
    const context = useContext(ResearchersContext);
    if (context === undefined) {
        throw new Error('useResearchers must be used within a ResearchersProvider');
    }
    return context;
};
