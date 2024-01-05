'use client'
import { createContext, use, useEffect, useState } from "react";
import React from 'react'
import Toast, { StatusToast, ToastInterface } from "../toast";
import { PronouncesInterface, UserInterface } from "./interfaces";
import { usePathname, useRouter } from "next/navigation";
import { TypeHTTP, api } from "@/utils/api/api";
import { signOut, useSession } from "next-auth/react";
import Cookies from 'js-cookie';
import { I18nextProvider } from 'react-i18next';


export const ThemeContext = createContext<{ datas: ThemeData; handles: ThemeHandles } | undefined>(undefined);

export interface ThemeData {
    toast: ToastInterface,
    user: UserInterface | undefined,
    showForm: boolean,
    pronounces: PronouncesInterface[]
}

export interface ThemeHandles {
    handleSetNotification: ({ status, message }: { status: StatusToast, message: string }) => void
    setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const ProviderContext: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const router = useRouter()
    const [toast, setToast] = useState<ToastInterface>({ message: '', status: StatusToast.NONE })
    const [user, setUser] = useState<UserInterface | undefined>(undefined)
    const [showForm, setShowForm] = useState<boolean>(false)

    const handleSetNotification = ({ status, message }: { status: StatusToast, message: string }) => {
        setToast({ status, message })
        setTimeout(() => {
            setToast({ status: StatusToast.NONE, message: '' })
        }, 2900)
    }

    const pronounces = [
        {
            name: 'David US',
            voiceName: 'Microsoft David - English (United States)',
            image: '/EN.png'
        },
        {
            name: 'Mark US',
            voiceName: 'Microsoft Mark - English (United States)',
            image: '/EN.png'
        },
        {
            name: 'Zira US',
            voiceName: 'Microsoft Zira - English (United States)',
            image: '/EN.png'
        },
        {
            name: 'Google US',
            voiceName: 'Google US English',
            image: '/EN.png'
        },
        {
            name: 'Google UK Male',
            voiceName: 'Google UK English Male',
            image: '/EN.png'
        },
        {
            name: 'Google UK Female',
            voiceName: 'Google UK English Female',
            image: '/EN.png'
        }
    ]

    // Check Routes (Sign in / Sign out)
    const pathname = usePathname()
    const { data: session, status, update } = useSession()
    useEffect(() => {
        if (pathname !== '/' && pathname !== '/auth-page/sign-in' && pathname !== '/auth-page/sign-up') {
            api({ path: '/auth/check-token', type: TypeHTTP.GET })
                .then(res => {
                    const result: any = res
                    try {
                        Cookies.set('accessToken', result.auth.accessToken)
                        Cookies.set('refreshToken', result.auth.refreshToken)
                        handles.setUser(result.user)
                    } catch (error) {
                        console.log(error)
                    }
                })
                .catch(res => {
                    Cookies.remove('accessToken')
                    Cookies.remove('refreshToken')
                    handles?.setUser(undefined)
                    router.push('/')
                })
        } else {
            api({ path: '/auth/check-token', type: TypeHTTP.GET })
                .then(res => {
                    const result: any = res
                    try {
                        Cookies.set('accessToken', result.auth.accessToken)
                        Cookies.set('refreshToken', result.auth.refreshToken)
                        handles.setUser(result.user)
                        router.push('/home-page')
                    } catch (error) {
                        console.log(error)
                    }
                })
        }
    }, [pathname])

    useEffect(() => {
        const body = document.querySelector('body')
        if (body) {
            if (showForm) {
                body.style.overflowY = 'hidden'
            } else {
                body.style.overflowY = 'auto'
            }
        }
    }, [showForm])

    const datas: ThemeData = {
        toast,
        user,
        showForm,
        pronounces
    };

    const handles: ThemeHandles = {
        handleSetNotification,
        setUser,
        setShowForm
    };

    return (
        <ThemeContext.Provider value={{ datas, handles }}>
            <div onClick={() => setShowForm(false)} className={`w-screen h-screen z-20 fixed top-0 left-0 bg-[#0000004b] ${datas?.showForm ? 'block' : 'hidden'}`} />
            <Toast message={toast.message} status={toast.status} />
            {children}
        </ThemeContext.Provider>
    )
}

export default ProviderContext