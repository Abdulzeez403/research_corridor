"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

interface Notification {
    id: string;
    message: string;
    createdAt: string; // Add other notification fields as necessary
}

interface NotificationsContextProps {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
    newNotification: boolean;
    getNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newNotification, setNewNotification] = useState<boolean>(false);
    const port = "https://research-corridor.onrender.com/api";
    const cookies = new Cookies();
    const token = cookies.get("token");

    const getNotifications = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${port}/notification`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            if (response.data.length > notifications.length) {
                setNewNotification(true);
            }
            setNotifications(response.data);
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, loading, error, newNotification, getNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = (): NotificationsContextProps => {
    const context = useContext(NotificationsContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};
