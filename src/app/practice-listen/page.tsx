'use client'
import { BroadCastYoutubeInterface } from '@/components/context/interfaces'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import DefaultLayout from '@/components/practice-listen/default-layout'
import PracticeLayout from '@/components/practice-listen/practice-layout'
import TestLayout from '@/components/practice-listen/test-layout'
import { TypeHTTP, api } from '@/utils/api/api'
import React, { useState } from 'react'

const PracticeListen = () => {

    const [currentBroadcast, setCurrentBroadcast] = useState<BroadCastYoutubeInterface | undefined>(undefined)
    const [startTest, setStartTest] = useState<boolean>(false)

    return (
        <>
            <PrivateNavbar />
            {!currentBroadcast ?
                <DefaultLayout setCurrentBroadcast={setCurrentBroadcast} />
                :
                startTest === false ?
                    <PracticeLayout currentBroadcast={currentBroadcast} setStartTest={setStartTest} />
                    :
                    <TestLayout currentBroadcast={currentBroadcast} />
            }
            <Footer />
        </>
    )
}

export default PracticeListen