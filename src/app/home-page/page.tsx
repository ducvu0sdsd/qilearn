'use client'
import { ThemeContext } from '@/components/context/themeContext'
import NodeList from '@/components/homePage/nodeList'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import { animate, motion } from 'framer-motion'
import React, { useContext, useEffect } from 'react'

const HomePage = () => {
    const { datas, handles } = useContext(ThemeContext) || {}
    localStorage.removeItem('is-first')
    return (
        <div className='px-[4rem] py-[60px]'>
            <PrivateNavbar />
            <section className='w-full h-auto mt-[2rem]'>
                <motion.h2
                    initial={{ y: '-50px', opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
                    className='font-bold text-[1.5rem] font-poppins my-3 text-[#2c2c2c]'>Learn English</motion.h2>
                <div className='px-[2rem] grid grid-cols-4 gap-x-5 gap-y-3 w-full'>
                    <NodeList url='/practice-vocabulary.png' />
                    <NodeList url='/practice-listen.png' />
                    <NodeList url='/practice-grammar.png' />
                    <NodeList url='/practice-speak.png' />
                    <NodeList url='/english-management.png' />
                </div>
            </section>
            <section className='w-full h-auto mt-[2rem]'>
                <motion.h2
                    initial={{ y: '-50px', opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
                    className='font-bold text-[1.5rem] font-poppins my-3 text-[#2c2c2c]'>Other</motion.h2>
                <div className='px-[2rem] grid grid-cols-4 gap-x-5 gap-y-3 w-full'>
                    <NodeList url='/note-management.png' />
                    <NodeList url='/study-time-management.png' />
                    <NodeList url='/to-do-list.png' />
                </div>
            </section>
        </div>
    )
}

export default HomePage