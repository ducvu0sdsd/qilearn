'use client'

import { WordInterface } from '@/components/context/interfaces'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import OptionManagement from '@/components/practice-vocabulary/option-management'
import PracticePage from '@/components/practice-vocabulary/practice-page'
import React, { useContext, useState } from 'react'

const PracticeVocabulary = () => {

    const [vocabulariesPractice, setVocabulariesPractice] = useState<WordInterface[]>([])
    const [languages, setLanguages] = useState<string>('')

    return (
        <>
            <PrivateNavbar />
            {vocabulariesPractice.length === 0 ?
                <OptionManagement setLanguages={setLanguages} setVocabulariesPractice={setVocabulariesPractice} />
                :
                <PracticePage setVocabulariesPractice={setVocabulariesPractice} languages={languages} vocabulariesPractice={vocabulariesPractice} />
            }
            <Footer />
        </>
    )
}

export default PracticeVocabulary