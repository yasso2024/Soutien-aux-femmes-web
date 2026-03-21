import { createContext, useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('auth-token') || null);
    const[user,setUser]=useState(null);
const logout = () => {
    localStorage.removeItem('auth-token');
    setToken(null);
    setUser(null);
  };
    useEffect(() => {
        async function fetchMe() {
            try {
                const response= await axiosClient.get('/auth/me');

                setUser(response.data.user);

            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        if (token) {
            localStorage.setItem('auth-token', token);
            fetchMe();
        } else {
      localStorage.removeItem('auth-token');
      setUser(null);
    }
    }, [token]);

    return (
        <AuthContext.Provider value={{token, setToken, user,setUser, logout }} >
            {children}
        </AuthContext.Provider>
    )
};