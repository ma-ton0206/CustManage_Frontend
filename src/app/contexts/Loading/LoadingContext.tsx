"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    navigateTo: (path: string) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // ✅ ページパスが変わったらローディングをOFFにする
        setIsLoading(false);
    }, [pathname, setIsLoading]);

    const navigateTo = (path: string) => {
        console.log("navigateTo path", path);
        console.log("navigateTo pathname", pathname);
        if (path === pathname) return;
        setIsLoading(true);
        router.push(path);
    }


    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, navigateTo }}>
            {children}

            {/* ✅ MUIのBackdrop＋CircularProgress */}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    flexDirection: "column",
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4} />
                <Typography sx={{ mt: 2 }}>読み込み中...</Typography>
            </Backdrop>
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const ctx = useContext(LoadingContext);
    if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
    return ctx;
};
