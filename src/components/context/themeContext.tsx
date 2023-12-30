'use client'
import { createContext, use, useEffect, useState } from "react";
import React from 'react'
import Toast, { StatusToast, ToastInterface } from "../toast";
import { UserInterface } from "./interfaces";
import { usePathname, useRouter } from "next/navigation";
import { TypeHTTP, api } from "@/utils/api/api";
import { signOut, useSession } from "next-auth/react";
import Cookies from 'js-cookie';


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
    const router = useRouter()
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

    // Check Routes (Sign in / Sign out)
    const pathname = usePathname()
    const { data: session, status, update } = useSession()
    useEffect(() => {
        const user_id = Cookies.get('user_id')
        const accessToken = Cookies.get('accessToken')
        const privateKey = Cookies.get('privateKey')
        const refreshToken = Cookies.get('refreshToken')
        if (pathname !== '/' && pathname !== '/auth-page/sign-in' && pathname !== '/auth-page/sign-up') {
            api({ path: `/auth/check-token?user_id=${user_id}&accessToken=${accessToken}&privateKey=${privateKey}&refreshToken=${refreshToken}`, type: TypeHTTP.GET })
                .then(res => {
                    const result: any = res
                    handles.setUser(result)
                })
                .catch(res => {
                    api({ path: '/keys', type: TypeHTTP.DELETE })
                        .then(res => {
                            Cookies.remove('user_id')
                            Cookies.remove('accessToken')
                            Cookies.remove('privateKey')
                            Cookies.remove('refreshToken')
                            router.push('/')
                        })
                })
        } else {
            api({ path: `/auth/check-token?user_id=${user_id}&accessToken=${accessToken}&privateKey=${privateKey}&refreshToken=${refreshToken}`, type: TypeHTTP.GET })
                .then(res => {
                    const result: any = res
                    handles.setUser(result)
                    router.push('/home-page')
                })
        }
    }, [pathname])

    return (
        <ThemeContext.Provider value={{ datas, handles }}>
            <Toast message={toast.message} status={toast.status} />
            {children}
        </ThemeContext.Provider>
    )
}

export default ProviderContext