import Cookies from 'js-cookie';
import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'
import { TypeHTTP, api } from '@/utils/api/api';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const PrivateNavbar = () => {

    const { datas, handles } = useContext(ThemeContext) || {}
    const router = useRouter()
    const handleSignOut = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        handles?.setUser(undefined)
        signOut()
    }
    return (
        <header className='
            flex justify-between 
            items-center h-[60px] 
            px-[1rem]
            lg:px-[3rem]
            fixed
            top-0
            left-0
            bg-white
            w-screen
            border-b-[1px]
            '>
            <img className='w-[9rem] md:w-[10rem]' src="/logo.png" alt="Qilearn - Learn English With Qizhy" />
            <ul className='
                items-center hidden 
                md:flex
                '>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] navbar-active'>Home</li>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545]'>About</li>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545]'>Courses</li>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545]'>Instructor</li>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545]'>Contact</li>
            </ul>
            <div className='flex items-center'>
                <svg className="mx-1.5 w-6 h-6 hidden md:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <img />
                <button
                    onClick={() => handleSignOut()}
                    className='
                    rounded-[20px] py-2.5 
                    px-5 font-semibold 
                    text-white mx-1.5 
                    bg-[#faa24c]
                    text-[12px]
                    md:text-[12px]
                    '>
                    Sign Out
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 block md:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

            </div>
        </header>
    )
}

export default PrivateNavbar