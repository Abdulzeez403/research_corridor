"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useSupervisorProfile } from '../context';
import { notify } from '@/app/components/toast';

interface Document {
    id: string;
    title: string;
    document: string;
    status: string;
    comments: string[];
    createdAt: string;
}

interface DocumentsContextProps {
    documents: Document[];
    document: Document | null;
    loading: boolean;
    error: string | null;
    getDocuments: (season: any) => void;
    getDocumentById: (id: string) => void;
    commentOnDocument: (id: string, comment: string) => void;
}

const DocumentsContext = createContext<DocumentsContextProps | undefined>(undefined);

export const SupervisorDocumentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [document, setDocument] = useState<Document | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const port = "https://research-corridor.onrender.com/api";
    const cookies = new Cookies();
    const token = cookies.get("token");


    const getDocuments = async (season: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor/documents/${season}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setDocuments(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getDocumentById = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/supervisor/document/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setDocument(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const commentOnDocument = async (id: string, comment: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${port}/supervisor/document/comment/${id}`, { comment }, {
                headers: {
                    'x-auth-token': token,
                },
            });
            // Optionally, refresh the document or documents list after commenting
            notify.success(response.data.msg)
            getDocumentById(id);
        } catch (error: any) {
            setError(error.message);
            notify.error(error.data.msg)

        } finally {
            setLoading(false);
        }
    };

    return (
        <DocumentsContext.Provider value={{ documents, document, loading, error, getDocuments, getDocumentById, commentOnDocument }}>
            {children}
        </DocumentsContext.Provider>
    );
};

export const useSupervisorDocuments = (): DocumentsContextProps => {
    const context = useContext(DocumentsContext);
    if (context === undefined) {
        throw new Error('useDocuments must be used within a DocumentsProvider');
    }
    return context;
};
