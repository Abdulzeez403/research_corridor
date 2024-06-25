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

interface IProp {
    loading: boolean;
    user: any,
    signIn: (payload: any) => void;
    seasons: any;
    supervisors: any
    departments: any,
    getDepartments: any,
    getSeasons: () => void;
    getSupervisors: (value: any) => void;
    researcherSignup: (values: any) => void;
    supervisorSignup: (values: any) => void;
    currentUser: (userId: any) => void;
    updateUser: (userId: any, values: any) => void;
    signOut: () => void;
}
const AuthContext = createContext<IProp>({
    loading: false,
    user: null || {},
    seasons: null,
    supervisors: null,
    departments: null,
    getDepartments: () => { },
    getSeasons: () => { },
    getSupervisors: (value) => { },
    signIn: (payload) => {
        return null
    },
    researcherSignup: (values) => { },
    supervisorSignup: (values) => { },
    currentUser: (userId) => { },
    updateUser: (userId, values) => { },
    signOut: () => { },
});

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

export const AuthProvider: React.FC<IProps> = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState({} as any);
    const [seasons, setSeasons] = useState()
    const [supervisors, setSupervisors] = useState()
    const [departments, setDepartments] = useState()
    const cookies = new Cookies()
    const router = useRouter();



    const port = "https://research-corridor.onrender.com/api"

    const signIn = async (payload: any) => {
        setLoading(true)
        try {
            const response = await axios.post(`${port}/auth/researcher-login`, payload);

            // UseSetCookie("user")
            UseSetCookie("token", response.data.token)
            setUser(response.data);
            setLoading(false)
            router.push('/admin');

            notify.success(response.data.msg);


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
        };
    };



    const researcherSignup = async (userData: any) => {
        setLoading(true);
        try {
            const response = await axios.post(`${port}/auth/researcher-signup`, userData);
            notify.success('Sign up successful');
            setLoading(false);
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
    };

    const supervisorSignup = async (userData: any) => {
        setLoading(true);
        try {
            const response = await axios.post(`${port}/auth/supervisor-signup`, userData);
            notify.success('Sign up successful');
            setLoading(false);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.msg) {
                notify.error(error.response.data.msg);
            } else {
                notify.error("An unknown error occurred.");
            }
            setLoading(false);

            throw error;
        }
    };

    const currentUser = async (userId: any) => {
        try {

            const { token } = cookies.get("token");
            const response = await axios.get(`${port}/user/${userId}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    };


    const updateUser = async (userId: any, values: any) => {
        setLoading(true);

        try {

            const { token } = cookies.get("token");
            const response = await axios.post(`${port}/performance/${userId}`, values, {
                headers: {
                    'x-auth-token': token
                }
            });
            setUser(response.data);
            console.log(response.data)
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
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
            console.error('Error fetching current supervisor:', error);
            throw error;
        }

    }





    const signOut = async () => {
        cookies.remove('user');
        cookies.remove('token');
        router.push('/')
        // window.location.reload();

    };


    return (
        <AuthContext.Provider
            value={{ loading, user, signIn, researcherSignup, supervisorSignup, currentUser, signOut, updateUser, getSupervisors, getSeasons, seasons, supervisors, departments, getDepartments }}>
            {children}

        </AuthContext.Provider>
    )
}