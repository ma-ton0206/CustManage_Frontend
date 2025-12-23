"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { GetUserOut } from "@/types/User";
import { FetchMeAPI } from "@/app/API/auth";

type AuthContextType = {
    logout: () => void;
    errorMsg: string;
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setErrorMsg: (value: string) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    token: string;
    setToken: (token: string) => void;
    user: GetUserOut | null;
    setUser: (user: GetUserOut | null) => void;
    isChecking: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("admin");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理
    const [token, setToken] = useState("");
    const [user, setUser] = useState<GetUserOut | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    const router = useRouter();

    // useEffect(() => {
    //     const token = sessionStorage.getItem("token");

    //     if (token) {
    //         setToken(token);
    //         setIsLoggedIn(true);
    //     } else {
    //         setIsLoggedIn(false);
    //     }

    //     setIsChecking(false);
    // }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            console.log("No token found");
            setIsLoggedIn(false);
            setIsChecking(false);
            return;
        }
        FetchMeAPI(token)
            .then((result) => {
                console.log("result", result);
                setToken(token);
                setIsLoggedIn(true);
                setUser(result.user);
            })
            .catch(() => {
                setIsLoggedIn(false);
            })
            .finally(() => {
                setIsChecking(false);
            });
    }, []);

    const logout = () => {
        sessionStorage.removeItem("token");
        setToken("");
        setIsLoggedIn(false);
        setUser(null);
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ logout, errorMsg, email, password, setEmail, setPassword, setErrorMsg, isLoggedIn, setIsLoggedIn, token, setToken, user, setUser, isChecking }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
