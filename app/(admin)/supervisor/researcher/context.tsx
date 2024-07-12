// researchersContext.tsx
'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { IResearcher } from '@/constant/models';



interface ResearchersContextProps {
    researchers: IResearcher[];
    researcher: IResearcher | null;
    loading: boolean;
    error: string | null;
    getResearchers: () => void;
    getResearcherById: (id: string) => void;
}

const ResearchersContext = createContext<ResearchersContextProps | undefined>(undefined);

export const AssignedResearchersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [researchers, setResearchers] = useState<IResearcher[]>([]);
    const [researcher, setResearcher] = useState<IResearcher | null>(null);
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
                    'season': "2023/2024"
                },
            });
            setResearchers(response.data.researchers);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getResearcherById = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor/get-researchers/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setResearcher(response.data.researcher);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ResearchersContext.Provider value={{ researchers, researcher, loading, error, getResearchers, getResearcherById }}>
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
