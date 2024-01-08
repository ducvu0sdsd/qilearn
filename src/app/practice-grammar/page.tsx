'use client'
import { GrammarInterface } from '@/components/context/interfaces'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import OptionManagement from '@/components/practice-grammar/option-management'
import PracticePage from '@/components/practice-grammar/practice-page'
import React, { useState } from 'react'

const PracticeGrammar = () => {

    const [grammarPractice, setGrammarPractice] = useState<GrammarInterface[]>([])
    const [languages, setLanguages] = useState<string>('')

    return (
        <>
            <PrivateNavbar />
            {grammarPractice.length === 0 ?
                <OptionManagement setLanguages={setLanguages} setGrammarPractice={setGrammarPractice} />
                :
                <PracticePage setGrammarPractice={setGrammarPractice} languages={languages} grammarPractice={grammarPractice} />
            }
            <Footer />
        </>
    )
}

export default PracticeGrammar