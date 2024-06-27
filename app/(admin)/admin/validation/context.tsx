"use client"
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { notify } from '@/app/components/toast';

interface UploadTopicContextType {
    loading: boolean;
    topics: any;
    uploadTopic: (title: string, supervisorIds: string[], document: File) => Promise<string>;
    getTopic: () => Promise<void>;
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
    const [topics, setTopics] = useState()
    const cookies = new Cookies();

    const port = "https://research-corridor.onrender.com/api";
    const token = cookies.get("token");


    const uploadTopic = useCallback(async (title: string, supervisorIds: string[], document: File) => {
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
            if (error.response) {
                console.error('Server Error:', error.response.data);
                notify.error(error.response.data.message || 'Server error occurred');
            } else if (error.request) {
                console.error('Network Error:', error.request);
                notify.error('Network error occurred. Please try again later.');
            } else {
                console.error('Error:', error.message);
                notify.error('An error occurred. Please try again.');
            }
            throw error;
        }
    }, []);


    const getTopic = async () => {
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

    return (
        <UploadTopicContext.Provider value={{ loading, topics, uploadTopic, getTopic }}>
            {children}
        </UploadTopicContext.Provider>
    );
};
