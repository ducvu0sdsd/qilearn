'use client'
import { TypeUser, UserSignUp } from '@/components/context/interfaces'
import { ThemeContext } from '@/components/context/themeContext'
import Provider from '@/components/provider'
import { StatusToast } from '@/components/toast'
import { TypeHTTP, api } from '@/utils/api/api'
import axios from 'axios'
import { motion } from 'framer-motion'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const AuthPage = () => {
    const defaultAvatar = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
    const { datas, handles } = useContext(ThemeContext) || {}
    const [userSignUp, setUserSignUp] = useState<UserSignUp>({
        username: '',
        fullname: '',
        email: '',
        image: defaultAvatar,
        password: '',
        confirmpassword: ''
    })

    const handleChangeImage = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                if (reader.result) {
                    setUserSignUp({ ...userSignUp, image: reader.result.toString() });
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSignUp = () => {
        const { username, fullname, email, image, password } = userSignUp
        api({ path: '/auth/sign-up', type: TypeHTTP.POST, body: { username, fullname, email, image, password, type: TypeUser.NORMAL } })
            .then(res => {
                handles?.handleSetNotification({ message: 'Account successfully created', status: StatusToast.SUCCESS })
            })
            .catch(res => {
                handles?.handleSetNotification({ message: res.message, status: StatusToast.FAIL })
            })
            .finally(() => {
                setTimeout(() => {
                    signOut()
                }, 2900);
            })
    }

    const { data: session, status, update } = useSession()
    const [creating, setCreating] = useState<boolean>(false)
    useEffect(() => {
        if (session?.user && status === 'authenticated') {
            if (!creating) {
                const { name, email, image } = session.user
                setCreating(true)
                api({ path: '/auth/sign-up-with-auth', type: TypeHTTP.POST, body: { fullname: name, email, image, type: TypeUser.GOOGLE } })
                    .then(res => {
                        setCreating(false)
                        handles?.handleSetNotification({ message: 'Account successfully created', status: StatusToast.SUCCESS })
                    })
                    .catch(res => {
                        setCreating(false)
                        handles?.handleSetNotification({ message: res.message, status: StatusToast.FAIL })
                    })
                    .finally(() => {
                        setCreating(false)
                        setTimeout(() => {
                            signOut()
                        }, 2900);
                    })
            }
        }
    }, [status, session])


    return (
        <motion.section
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
            className='w-full min-h-screen py-[3rem] flex items-center justify-center' style={{ backgroundImage: `url(/auth.png)` }}>
            <div className='shadow-2xl flex flex-col py-[1.0rem] px-[2rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br rounded-[1rem] '>
                <h1 className=' my-[4px] mb-[1rem] font-bold text-[28px] font-poppins' >Sign Up</h1>
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, username: e.target.value })} className='focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] w-[25rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' placeholder='Username' />
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, email: e.target.value })} className='focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] w-[25rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='email' placeholder='Email' />
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, fullname: e.target.value })} className='focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] w-[25rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='text' placeholder='Full Name' />
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, password: e.target.value })} className='focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] w-[25rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='password' placeholder='Password' />
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, confirmpassword: e.target.value })} className='focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] w-[25rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='password' placeholder='Confirm Password' />
                <input onChange={(e: any) => handleChangeImage(e)} className='focus:scale-[1.03] transition pt-[13px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] w-[25rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='file' accept='.png, .jpg, .jpeg' />
                <button
                    onClick={() => handleSignUp()}
                    className='hover:scale-[1.02] transition my-[0.5rem] font-semibold rounded-[10px] py-[12px] text-[white] bg-[#241d49]'>
                    Sign Up</button>
                <div className='my-1 flex items-center justify-center'>
                    <div className='h-[1px] w-[40%] bg-black rounded-[10px]' />
                    <span className='mx-4'>Or</span>
                    <div className='h-[1px] w-[40%] bg-black rounded-[10px]' />
                </div>

                <button
                    onClick={async () => {
                        await signIn('google')
                    }}
                    className='hover:scale-[1.02] transition text-[15px] my-[5px] justify-center py-[10px] rounded-[10px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br flex items-center text-black font-semibold'>
                    <i className='bx bxl-google text-[2rem] mr-2'></i>
                    Continue With Google</button>
                <button
                    onClick={async () => {
                        await signIn('github')
                    }}
                    className='hover:scale-[1.02] transition text-[15px] my-[5px] justify-center py-[10px] rounded-[10px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br flex items-center text-black font-semibold'>
                    <i className='bx bxl-github text-[2rem] mr-2'></i>
                    Continue With GitHub</button>
                <p className='w-full text-center mt-[0.5rem]'>
                    Have an account? <Link href={'sign-in'}><span className='font-bold underline cursor-pointer'>Sign In</span></Link></p>
            </div>
        </motion.section >

    )
}

export default AuthPage