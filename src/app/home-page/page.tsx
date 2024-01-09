'use client'
import { ThemeContext } from '@/components/context/themeContext'
import Footer from '@/components/footer/Footer'
import AnalyticalVocabulary from '@/components/homePage/analyticalVocabulary'
import Grammar from '@/components/homePage/grammar'
import NodeList from '@/components/homePage/nodeList'
import StudyTime from '@/components/homePage/studyTime'
import Todolist from '@/components/homePage/todolist'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react'

const HomePage = () => {
    const { datas, handles } = useContext(ThemeContext) || {}

    Cookies.remove('is-first')
    return (
        <>
            <div className='px-[1rem] sm:px-[4rem] py-[60px]'>
                <PrivateNavbar />
                <section className='w-full h-auto mt-[2rem]'>
                    <motion.h2
                        initial={{ y: '-50px', opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
                        className='font-bold text-[27px] md:text-[1.5rem] font-poppins my-3 text-[#2c2c2c]'>Learn English</motion.h2>
                    <div className='px-[1rem] grid-cols-1 md:grid-cols-4 md:px-[2rem] grid gap-x-5 gap-y-3 w-full'>
                        <NodeList reload={false} url='/practice-vocabulary' urlImage='/practice-vocabulary.png' />
                        <NodeList reload={true} url='/practice-listen' urlImage='/practice-listen.png' />
                        <NodeList reload={false} url='/practice-grammar' urlImage='/practice-grammar.png' />
                        <NodeList reload={false} url='' urlImage='/practice-speak.png' />
                        <NodeList reload={false} url='/words-management' urlImage='/words-management.png' />
                        <NodeList reload={false} url='/grammars-management' urlImage='/grammar-management.png' />
                    </div>
                </section>
                <section className='w-full h-auto mt-[2rem]'>
                    <motion.h2
                        initial={{ y: '-50px', opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
                        className='font-bold text-[27px] md:text-[1.5rem] font-poppins my-3 text-[#2c2c2c]'>Other</motion.h2>
                    <div className='px-[1rem] grid-cols-1 md:grid-cols-4 md:px-[2rem] grid gap-x-5 gap-y-3 w-full'>
                        <NodeList reload={false} url='' urlImage='/note-management.png' />
                        <NodeList reload={false} url='' urlImage='/study-time-management.png' />
                        <NodeList reload={false} url='' urlImage='/to-do-list.png' />
                    </div>
                </section>
                <AnalyticalVocabulary />
                <Grammar />
                <StudyTime />
                <Todolist />
            </div>
            <Footer />
        </>
    )
}

export default HomePage