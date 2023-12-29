'use client'
import { createContext, useEffect, useState } from "react";
import React from 'react'
import Toast, { StatusToast, ToastInterface } from "../toast";
import { UserInterface } from "./interfaces";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export const ThemeContext = createContext<{ datas: ThemeData; handles: ThemeHandles } | undefined>(undefined);

export interface ThemeData {
    toast: ToastInterface,
    user: UserInterface | undefined
}

export interface ThemeHandles {
    handleSetNotification: ({ status, message }: { status: StatusToast, message: string }) => void
    setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
}

export interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const ProviderContext: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<ToastInterface>({ message: '', status: StatusToast.NONE })
    const [user, setUser] = useState<UserInterface | undefined>(undefined)

    const handleSetNotification = ({ status, message }: { status: StatusToast, message: string }) => {
        setToast({ status, message })
        setTimeout(() => {
            setToast({ status: StatusToast.NONE, message: '' })
        }, 2900)
    }

    const datas: ThemeData = {
        toast,
        user
    };

    const handles: ThemeHandles = {
        handleSetNotification,
        setUser
    };

    const pathname = usePathname()
    const { data: session, status } = useSession()

    return (
        <ThemeContext.Provider value={{ datas, handles }}>
            <Toast message={toast.message} status={toast.status} />
            {children}
        </ThemeContext.Provider>
    )
}

export default ProviderContext