"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

// Define the structure for the validation request
interface ValidationRequest {
    id: string;
    // Add other relevant fields here
}

// Define the structure for the context state
interface ValidationRequestsContextProps {
    validationRequests: ValidationRequest[] | null;
    loading: boolean;
    error: string | null;
    fetchAllValidationRequests: () => void;
    fetchValidationRequestById: (id: string) => Promise<ValidationRequest | null>;
    addCommentToValidationRequest: (id: string, comment: string) => Promise<void>;
}

// Create the context with a default value of undefined
const ValidationRequestsContext = createContext<ValidationRequestsContextProps | undefined>(undefined);

// Define the provider component
export const ValidationRequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [validationRequests, setValidationRequests] = useState<ValidationRequest[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const cookies = new Cookies();
    const token = cookies.get("token");
    const baseUrl = "https://your-api-base-url.com/api/supervisor/validation-requests";

    // Fetch all validation requests
    const fetchAllValidationRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(baseUrl, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setValidationRequests(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch a specific validation request by ID
    const fetchValidationRequestById = async (id: string): Promise<ValidationRequest | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${baseUrl}/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            return response.data;
        } catch (error: any) {
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Add a comment to a validation request
    const addCommentToValidationRequest = async (id: string, comment: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await axios.put(`${baseUrl}/comment/${id}`, { comment }, {
                headers: {
                    'x-auth-token': token,
                },
            });
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ValidationRequestsContext.Provider value={{
            validationRequests,
            loading,
            error,
            fetchAllValidationRequests,
            fetchValidationRequestById,
            addCommentToValidationRequest
        }}>
            {children}
        </ValidationRequestsContext.Provider>
    );
};

// Custom hook to use the ValidationRequestsContext
export const useValidationRequests = (): ValidationRequestsContextProps => {
    const context = useContext(ValidationRequestsContext);
    if (context === undefined) {
        throw new Error('useValidationRequests must be used within a ValidationRequestsProvider');
    }
    return context;
};
