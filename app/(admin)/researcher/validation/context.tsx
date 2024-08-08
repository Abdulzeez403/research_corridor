"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { notify } from '@/app/components/toast';
import { ITopicModel } from '@/constant/models';

interface UploadTopicContextType {
    loading: boolean;
    topics: any[];
    uploadTopic: (title: string, supervisorIds: string[], document: File) => Promise<string>;
    getTopic: () => Promise<void>;
    deleteTopic: (id: any) => Promise<void>;
}

const UploadTopicContext = createContext<UploadTopicContextType | undefined>(undefined);

export const useUploadTopic = () => {
    const context = useContext(UploadTopicContext);
    if (!context) {
        throw new Error('useUploadTopic must be used within an UploadTopicProvider');
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const UploadTopicProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [topics, setTopics] = useState<ITopicModel[]>([])
    const cookies = new Cookies();

    const [token, setToken] = useState<string | undefined>(undefined);

    const port = "https://research-corridor.onrender.com/api";

    useEffect(() => {
        const tokenFromCookies = cookies.get("token");
        setToken(tokenFromCookies);
    }, []);


    const uploadTopic = async (title: string, supervisorIds: string[], document: File) => {
        const token = cookies.get("token");

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('supervisorIds', JSON.stringify(supervisorIds));
            formData.append('document', document);

            const response = await axios.post(`${port}/researcher/upload-topic`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token,
                },
            });
            setLoading(false);
            notify.success(response.data.msg);
            return response.data.msg;
        } catch (error: any) {
            setLoading(false);
            notify.error(error.response.data.msg);
            throw error;
        }
    };


    const getTopic = async () => {
        const token = cookies.get("token");

        try {
            const response = await axios.get(`${port}/researcher/get-topics`, {
                headers: {
                    'x-auth-token': token
                },
            });
            setTopics(response.data);
        } catch (err: any) {
            console.log(err.response?.data?.message || 'Failed to fetch documents.');
        } finally {
            setLoading(false);
        }

    }

    const deleteTopic = async (id: any) => {
        setLoading(true)
        const token = cookies.get("token");
        try {
            const response = await axios.delete(`${port}/researcher/delete-topic/${id}`, {
                headers: {
                    'x-auth-token': token
                },
            });
            notify.success(response.data.msg);
            return response.data;
        } catch (error: any) {
            notify.error(error.response.data.msg);


        }

    }

    useEffect(() => {
        getTopic()
    }, [])

    return (
        <UploadTopicContext.Provider value={{ loading, topics, uploadTopic, getTopic, deleteTopic }}>
            {children}
        </UploadTopicContext.Provider>
    );
};
