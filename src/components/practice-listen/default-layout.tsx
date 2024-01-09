import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/themeContext'
import axios from 'axios'
import { formatDuration, parseISO8601Duration } from '@/utils/broadcast/time'
import { BroadcastInterface } from '../context/interfaces'

interface DefaultLayoutInterface {
    setCurrentBroadcast: React.Dispatch<React.SetStateAction<BroadcastInterface | undefined>>
}

const DefaultLayout = ({ setCurrentBroadcast }: DefaultLayoutInterface) => {

    const { datas, handles } = useContext(ThemeContext) || {}
    const [broadCasts, setBroadCasts] = useState<BroadcastInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setBroadCasts(datas?.broadCasts || [])
    }, [datas?.broadCasts])

    useEffect(() => {
        if (broadCasts.length === datas?.broadCasts.length) {
            setLoading(false)
        }
    }, [broadCasts])

    useEffect(() => {
        console.log(loading)
    }, [loading])

    return (
        <section className='pt-[5rem] pb-[2rem] px-[2rem]'>
            <h1 className='font-poppins font-semibold text-[24px] mt-6'>BroadCasts</h1>
            <div className='grid grid-cols-4 gap-x-4 gap-y-4 my-4'>
                {broadCasts.map((broadCast, index) => (
                    <div
                        onClick={() => setCurrentBroadcast(broadCast)}
                        key={index}
                        className='rounded-md cursor-pointer overflow-hidden flex flex-col bg-white shadow-xl'>
                        <img src={broadCast.thum} width={'100%'} />
                        <div className='py-1 flex justify-between'>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>{broadCast.title}
                            </span>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>
                                {broadCast.duration}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default DefaultLayout