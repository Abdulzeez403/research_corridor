"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { notify } from '@/app/components/toast';
interface IComment {
    _id: string;
    createdAt: string;
    comment?: string;
}

interface IProgress {
    _id: string;
    progressPercent: number;
    season: string;
}

interface ResearcherProgress {
    _id: string;
    supervisorId: string;
    researcherId: {
        _id: string;
        name: string;
        matric: string;
    };
    progressPercent: number;
    progress: IProgress;
    comments: IComment[];
}



interface AddProgressRequest {
    progressId: string;
    percentage: number;
    comments: string;
}



interface ProgressContextProps {
    allProgress: ResearcherProgress[] | null;
    singleProgress: ResearcherProgress | null;
    loading: boolean;
    error: string | null;
    getAllProgress: (season: string) => void;
    getSingleProgress: (id: string) => void;
    addProgress: (data: AddProgressRequest) => void;
}

const ProgressContext = createContext<ProgressContextProps | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allProgress, setAllProgress] = useState<ResearcherProgress[] | null>(null);
    const [singleProgress, setSingleProgress] = useState<ResearcherProgress | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const port = "https://research-corridor.onrender.com/api";
    const cookies = new Cookies();
    const token = cookies.get("token");

    const getAllProgress = async (season: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor/get-all-progress/${season}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setAllProgress(response.data);
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const getSingleProgress = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor/get-progress/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setSingleProgress(response.data.progress);
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const addProgress = async (data: AddProgressRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${port}/supervisor/add-progress`, data, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
            });
            notify.success(response.data.msg);
            // Update the progress in state if necessary
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
            notify.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProgressContext.Provider value={{ allProgress, singleProgress, loading, error, getAllProgress, getSingleProgress, addProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};
export const useProgress = (): ProgressContextProps => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

