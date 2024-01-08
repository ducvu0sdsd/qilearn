'use client'
import { createContext, use, useEffect, useState } from "react";
import React from 'react'
import Toast, { StatusToast, ToastInterface } from "../toast";
import { GrammarInterface, PronouncesInterface, UserInterface, WordInterface } from "./interfaces";
import { usePathname, useRouter } from "next/navigation";
import { TypeHTTP, api } from "@/utils/api/api";
import { signOut, useSession } from "next-auth/react";
import Cookies from 'js-cookie';
import useSWR from "swr";
import { vocabularies as english, getEnglish, getTypes, getVietNamese } from "@/utils/translate/translate";
import { ThemeProvider } from "@material-tailwind/react";


export const ThemeContext = createContext<{ datas: ThemeData; handles: ThemeHandles } | undefined>(undefined);

export interface ThemeData {
    toast: ToastInterface,
    user: UserInterface | undefined,
    showForm: boolean,
    pronounces: PronouncesInterface[]
    vocabularies: WordInterface[]
    grammars: GrammarInterface[]
}

export interface ThemeHandles {
    handleSetNotification: ({ status, message }: { status: StatusToast, message: string }) => void
    setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
    setVocabularies: React.Dispatch<React.SetStateAction<WordInterface[]>>
    setGrammars: React.Dispatch<React.SetStateAction<GrammarInterface[]>>
    getTotalVocabularies: () => WordInterface[]
    getTotalQilearnVocabularies: () => WordInterface[]
}

export interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const ProviderContext: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const router = useRouter()
    const [toast, setToast] = useState<ToastInterface>({ message: '', status: StatusToast.NONE })
    const [user, setUser] = useState<UserInterface | undefined>(undefined)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [vocabularies, setVocabularies] = useState<WordInterface[]>([])
    const [grammars, setGrammars] = useState<GrammarInterface[]>([])

    const handleSetNotification = ({ status, message }: { status: StatusToast, message: string }) => {
        setToast({ status, message })
        setTimeout(() => {
            setToast({ status: StatusToast.NONE, message: '' })
        }, 2900)
    }

    const getAllVocabulariesByUserID: (id: string) => { data: WordInterface[], isLoading: boolean } = (id: string) => {
        const fetcher = (url: string) => api({ path: url, type: TypeHTTP.GET }).then(res => res);
        const { data, error, isLoading } = useSWR(`/vocabularies/${id}`, fetcher, {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        });
        return {
            data: (data as WordInterface[]) || [],
            isLoading: isLoading
        }
    }

    const getAllGrammarsByUserID: (id: string) => GrammarInterface[] = (id: string) => {
        const fetcher = (url: string) => api({ path: url, type: TypeHTTP.GET }).then(res => res);
        const { data, error, isLoading } = useSWR(`/grammars/${id}`, fetcher, {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        });
        return (data as GrammarInterface[]) || []
    }

    const { data, isLoading } = getAllVocabulariesByUserID(user?._id || '')
    useEffect(() => {
        if (data) {
            setVocabularies(data)
        }
    }, [isLoading])

    const grammar = getAllGrammarsByUserID(user?._id || '')

    const getTotalVocabularies = () => {
        const results = vocabularies.map(item => item)
        const vocas = results.map((eng) => {
            return eng.english.toLowerCase()
        })
        english.forEach((word: any) => {
            const vocabulary: WordInterface = {
                english: getEnglish(word),
                types: getTypes(word),
                vietnamese: getVietNamese(word)
            }
            if (!vocas.includes(vocabulary.english.toLowerCase())) {
                results.push(vocabulary)
            }
        })
        return results
    }

    const getTotalQilearnVocabularies = () => {
        const results: WordInterface[] = []
        english.forEach((word: any) => {
            const vocabulary: WordInterface = {
                english: getEnglish(word),
                types: getTypes(word),
                vietnamese: getVietNamese(word)
            }
            results.push(vocabulary)
        })
        return results
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
        pronounces,
        vocabularies,
        grammars
    };

    const handles: ThemeHandles = {
        handleSetNotification,
        setUser,
        setShowForm,
        setVocabularies,
        getTotalVocabularies,
        getTotalQilearnVocabularies,
        setGrammars
    };

    return (
        <ThemeContext.Provider value={{ datas, handles }}>
            <ThemeProvider>
                <div onClick={() => setShowForm(false)} className={`w-screen h-screen z-20 fixed top-0 left-0 bg-[#0000004b] ${datas?.showForm ? 'block' : 'hidden'}`} />
                <Toast message={toast.message} status={toast.status} />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ProviderContext