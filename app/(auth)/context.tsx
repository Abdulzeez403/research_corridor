"use client"
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { notify } from '../components/toast';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { IUser } from '@/constant/models';
import { UseSetCookie } from '../components/hooks/cookie';



interface DecodedToken {
    _id: string;
    username: string;
    membership: string;
}

interface AuthIPropContextProps {
    loading: boolean;
    user: any,
    seasons: any;
    supervisors: any
    departments: any,
    getDepartments: any,
    getSeasons: () => void;
    getSupervisors: (value: any) => void;
    researcherSignup: (values: any) => void;
    supervisorSignup: (values: any) => void;
    supervisorSignIn: (payload: any) => void;
    researcherSignIn: (payload: any) => void;
    updateSupervisor: (values: any) => void;
    updateResearcher: (values: any) => void;
    signOut: () => void;
}
const AuthContext = createContext<AuthIPropContextProps | undefined>(undefined);

export const useAuthContext = () => {
    let context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

const handleAxiosError = (error: any) => {
    if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Server Error:', error.response.data);
        notify.error(error.response.data.message || error.response.data.msg || 'Server error occurred');
    } else if (error.request) {
        // Request was made but no response was received
        console.error('Network Error:', error.request);
        notify.error('Network error occurred. Please try again later.');
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        notify.error('An error occurred. Please try again.');
    }
    throw error; // Re-throw the error after handling it
};


export const AuthProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState({} as any);
    const [seasons, setSeasons] = useState()
    const [supervisors, setSupervisors] = useState()
    const [departments, setDepartments] = useState()
    const cookies = new Cookies()
    const router = useRouter();
    const token = cookies.get("token");



    const port = "https://research-corridor.onrender.com/api"

    const researcherSignIn = async (payload: any) => {
        // setLoading(true)
        try {
            const response = await axios.post(`${port}/auth/researcher-login`, payload);
            await UseSetCookie("token", response.data.token)
            setUser(response.data);
            // setLoading(false)
            router.push('/researcher');
            notify.success(response.data.msg);

        } catch (error: any) {
            // setLoading(false);
            notify.error(error.response.data.msg);
            throw error;
        };
    };


    const supervisorSignIn = async (payload: any) => {
        // setLoading(true)
        try {
            const response = await axios.post(`${port}/auth/supervisor-login`, payload);
            UseSetCookie("token", response.data.token)
            setUser(response.data);
            setLoading(false)
            router.push('/supervisor');
            notify.success(response.data.msg);



        } catch (error: any) {
            // setLoading(false);
            notify.error(error.response.data.msg);
            throw error;
        };
    };



    const researcherSignup = async (userData: any) => {
        setLoading(true);
        try {
            const response = await axios.post(`${port}/auth/researcher-signup`, userData);
            UseSetCookie("token", response.data.token)
            setUser(response.data);
            setLoading(false)
            router.push('/researcher');
            notify.success(response.data.msg);
        } catch (error: any) {
            setLoading(false);
            notify.error(error.response.data.msg);

            throw error;
        }
    };

    const supervisorSignup = async (userData: any) => {
        setLoading(true);
        try {
            const response = await axios.post(`${port}/auth/supervisor-signup`, userData);
            UseSetCookie("token", response.data.token)
            setUser(response.data);
            setLoading(false)
            router.push('/supervisor');

            notify.success(response.data.msg);
        } catch (error: any) {
            setLoading(false);
            notify.error(error.response.data.msg);

            throw error;
        }
    };



    const getSeasons = async () => {
        try {
            const response = await axios.get(`${port}/season`, {

            });
            setSeasons(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching season:', error);
            throw error;
        }

    };

    const getDepartments = async () => {
        try {
            const response = await axios.get(`${port}/department`, {

            });
            setDepartments(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching season:', error);
            throw error;
        }

    }

    const getSupervisors = async (value: any) => {
        try {
            const response = await axios.post(`${port}/supervisor`, {
                department: value

            });
            setSupervisors(response.data);
            return response.data;
        } catch (error) {
            handleAxiosError(error)
            throw error;
        }

    }

    const updateResearcher = async (values: any) => {
        try {
            const response = await axios.put(`${port}/auth/researcher-update`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
            console.log('Response:', response.data);
            notify.success(response.data.msg)
        } catch (error: any) {
            console.error('Error updating researcher:', error.message);
            notify.error(error.data.msg)

        }
    }

    const updateSupervisor = async (values: any) => {
        try {
            const response = await axios.put(`${port}/auth/supervisor-update`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
            notify.error(response.data.msg)

            console.log('Response:', response.data);

        } catch (error: any) {
            notify.error(error.data.msg)

            console.error('Error updating supervisor:', error.message);

        }
    }

    const signOut = async () => {
        try {
            cookies.remove('token', { path: '/' });
            router.push('/');
            // window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ loading, user, researcherSignIn, researcherSignup, supervisorSignup, supervisorSignIn, updateResearcher, signOut, updateSupervisor, getSupervisors, getSeasons, seasons, supervisors, departments, getDepartments }}>
            {children}

        </AuthContext.Provider>
    )
}