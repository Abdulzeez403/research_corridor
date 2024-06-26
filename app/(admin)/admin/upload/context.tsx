"use client";
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';

// Define the type for the context
interface DocumentContextType {
    documents: any[];
    loading: boolean;
    error: string | null;
    uploadDocument: (title: string, document: File) => Promise<void>;
    fetchDocuments: () => Promise<void>;
}

// Create the context
const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// Custom hook to use the DocumentContext
export const useDocumentContext = () => {
    const context = useContext(DocumentContext);
    if (context === undefined) {
        throw new Error("useDocumentContext must be used within a DocumentProvider");
    }
    return context;
};

// Define the provider's props type
interface DocumentProviderProps {
    children: React.ReactNode;
}

// DocumentProvider component
export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const cookies = new Cookies();

    const port = "https://research-corridor.onrender.com/api";

    // Upload document function
    const uploadDocument = async (title: string, document: File) => {
        setLoading(true);
        setError(null);

        try {
            const token = cookies.get("token");
            console.log(token, "the token....");

            const formData = new FormData();
            formData.append('title', title);
            formData.append('document', document);

            await axios.post(`${port}/researcher/upload-research`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                },
            });

            await fetchDocuments();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to upload document.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch documents function
    const fetchDocuments = async () => {
        setLoading(true);
        setError(null);
        const token = cookies.get("token");


        try {
            const response = await axios.get(`${port}/researcher/get-research`, {
                headers: {
                    'x-auth-token': token
                },
            });
            setDocuments(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch documents.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DocumentContext.Provider value={{ documents, loading, error, uploadDocument, fetchDocuments }}>
            {children}
        </DocumentContext.Provider>
    );
};
