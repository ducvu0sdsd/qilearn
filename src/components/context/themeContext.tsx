'use client'
import { createContext, useEffect, useState } from "react";
import React from 'react'
import Toast, { StatusToast, ToastInterface } from "../toast";

export const ThemeContext = createContext<{ datas: ThemeData; handles: ThemeHandles } | undefined>(undefined);

export interface ThemeData {
    toast: ToastInterface
}

export interface ThemeHandles {
    handleSetNotification: ({ status, message }: { status: StatusToast, message: string }) => void
}

export interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const ProviderContext: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<ToastInterface>({ message: '', status: StatusToast.NONE })

    const handleSetNotification = ({ status, message }: { status: StatusToast, message: string }) => {
        setToast({ status, message })
        setTimeout(() => {
            setToast({ status: StatusToast.NONE, message: '' })
        }, 2900)
    }

    const datas: ThemeData = {
        toast
    };

    const handles: ThemeHandles = {
        handleSetNotification
    };



    return (
        <ThemeContext.Provider value={{ datas, handles }}>
            <Toast message={toast.message} status={toast.status} />
            {children}
        </ThemeContext.Provider>
    )
}

export default ProviderContext