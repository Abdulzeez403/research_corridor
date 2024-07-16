import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';



interface Grade {
    gradeId: string;
    introduction: number;
    reviewLit: number;
    researchMethod: number;
    dataAnalysis: number;
    discussion: number;
    language: number;
    reference: number;
    formart: number;
    total: number;
    generalComment: string;
    evaluator: string;
}

interface GradesContextProps {
    grades: Grade[];
    singleGrade: Grade | null;
    fetchAllGrades: (season: string) => Promise<void>;
    fetchSingleGrade: (id: string) => Promise<void>;
    addGrade: (grade: Grade) => Promise<void>;
}

const GradesContext = createContext<GradesContextProps | undefined>(undefined);

export const useGrades = () => {
    const context = useContext(GradesContext);
    if (!context) {
        throw new Error('useGrades must be used within a GradesProvider');
    }
    return context;
};


interface IProp {
    children: React.ReactNode;
}

export const GradesProvider = ({ children }: IProp) => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [singleGrade, setSingleGrade] = useState<Grade | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const baseUrl = "https://research-corridor.onrender.com/api";
    const cookies = new Cookies();
    const token = cookies.get("token");

    const fetchAllGrades = async (season: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${baseUrl}/supervisor/grades/${season}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setGrades(response.data?.grades?.researcherId);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSingleGrade = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${baseUrl}/api/supervisor/grade/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setSingleGrade(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addGrade = async (grade: Grade) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${baseUrl}/api/supervisor/grades`, grade, {
                headers: {
                    'x-auth-token': token,
                },
            });
            // Optionally update local state or refetch grades
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GradesContext.Provider value={{ grades, singleGrade, fetchAllGrades, fetchSingleGrade, addGrade }}>
            {children}
        </GradesContext.Provider>
    );
};
