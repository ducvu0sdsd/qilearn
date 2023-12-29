'use client'
import { TypeHTTP, api } from '@/utils/api/api'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@/components/context/themeContext'
import { StatusToast } from '@/components/toast'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
export interface UserSignIn {
    username: string
    password: string
}

const AuthPage = () => {
    const { datas, handles } = useContext(ThemeContext) || {}
    const [userSignIn, setUserSignIn] = useState<UserSignIn>({
        username: '',
        password: ''
    })
    const router = useRouter()

    const handleSignIn = () => {
        const { username, password } = userSignIn
        api({ path: '/auth/sign-in', body: { username, password }, type: TypeHTTP.POST })
            .then(res => {
                handles?.handleSetNotification({ message: 'Logged in successfully', status: StatusToast.SUCCESS })
                setTimeout(() => {
                    router.push('/home-page')
                }, 1500);
            })
            .catch(res => {
                handles?.handleSetNotification({ message: `UserName Or Password don't exists in the system`, status: StatusToast.FAIL })
            })
    }

    // const fetcher = (url: string) => api({ path: url, type: TypeHTTP.GET }).then(res => res);
    // const { data, error, isLoading } = useSWR('/users', fetcher, {
    //     revalidateOnFocus: false,
    //     revalidateIfStale: false,
    //     revalidateOnReconnect: false,
    // });

    const { data: session, status } = useSession()
    const [isSignIn, setIsSignIn] = useState<boolean>(false)
    useEffect(() => {
        const isFirst: string | null = localStorage.getItem('is-first')
        if (!isFirst) {
            if (status === 'authenticated') {
                signOut()
            }
        } else {
            if (session?.user) {
                if (!isSignIn) {
                    console.log(1111)
                    const { name, email, image } = session.user
                    setIsSignIn(true)
                    api({ path: '/auth/sign-in', body: { username: email, password: '' }, type: TypeHTTP.POST })
                        .then(res => {
                            const result: any = res
                            if (result.status === 200) {
                                handles?.handleSetNotification({ message: 'Logged in successfully', status: StatusToast.SUCCESS })
                                setIsSignIn(false)
                                handles?.setUser(result.metadata.data)
                                setTimeout(() => {
                                    router.push('/home-page')
                                }, 1500);
                            }
                        })
                        .catch(res => {
                            handles?.handleSetNotification({ message: "Google account does not exist in the system", status: StatusToast.FAIL })
                            setIsSignIn(false)
                        })
                }
            }
        }
    }, [session])

    return (
        <motion.section
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
            className='w-full min-h-screen py-[3rem] flex items-center justify-center' style={{ backgroundImage: `url(/auth.png)` }}>
            <div className='shadow-2xl flex flex-col p-[2rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br rounded-[1rem] '>
                <h1 className=' my-[0.5rem] mb-[1rem] font-bold text-[28px] font-poppins' >Sign In</h1>
                <input onChange={(e: any) => setUserSignIn({ ...userSignIn, username: e.target.value })} className='focus:scale-[1.03] transition pt-1 text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] w-[25rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' placeholder='Username or email' />
                <input onChange={(e: any) => setUserSignIn({ ...userSignIn, password: e.target.value })} className='focus:scale-[1.03] transition pt-1 text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] w-[25rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='password' placeholder='Password' />
                <div className='flex items-center my-2 text-[#424242]'>
                    <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value="" className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    Remember me
                </div>
                <button
                    onClick={() => handleSignIn()}
                    className='hover:scale-[1.02] transition my-[0.5rem] font-semibold rounded-[10px] py-[12px] text-[white] bg-[#241d49]'>
                    Sign In</button>
                <a className='cursor-pointer w-full text-center text-[14px]'>Forgot Password?</a>
                <div className='my-2 flex items-center justify-center'>
                    <div className='h-[1px] w-[40%] bg-black rounded-[10px]' />
                    <span className='mx-4'>Or</span>
                    <div className='h-[1px] w-[40%] bg-black rounded-[10px]' />
                </div>

                <button
                    onClick={() => {
                        localStorage.setItem('is-first', 'vutienduc')
                        signIn('google')
                    }}
                    className='hover:scale-[1.02] transition text-[15px] my-[5px] justify-center py-[10px] rounded-[10px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br flex items-center text-black font-semibold'>
                    <i className='bx bxl-google text-[2rem] mr-2'></i>
                    Continue With Google</button>
                <button
                    onClick={() => {
                        localStorage.setItem('is-first', 'vutienduc')
                        signIn('github')
                    }}
                    className='hover:scale-[1.02] transition text-[15px] my-[5px] justify-center py-[10px] rounded-[10px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br flex items-center text-black font-semibold'>
                    <i className='bx bxl-github text-[2rem] mr-2'></i>
                    Continue With GitHub</button>
                <p className='w-full text-center mt-[2.0rem]'>
                    Don&#39;t have an account? <Link href={'sign-up'}><span className='font-bold underline cursor-pointer'>Sign Up</span></Link></p>
            </div>
        </motion.section>
    )
}

export default AuthPage