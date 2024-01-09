import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/themeContext'
import { BroadCastYoutubeInterface } from '../context/interfaces'
import axios from 'axios'
import { formatDuration, parseISO8601Duration } from '@/utils/broadcast/time'

interface DefaultLayoutInterface {
    setCurrentBroadcast: React.Dispatch<React.SetStateAction<BroadCastYoutubeInterface | undefined>>
}

const DefaultLayout = ({ setCurrentBroadcast }: DefaultLayoutInterface) => {

    const { datas, handles } = useContext(ThemeContext) || {}
    const [broadCasts, setBroadCasts] = useState<BroadCastYoutubeInterface[]>([])

    useEffect(() => {
        datas?.broadCasts.forEach(item => {
            const urlVideo = `https://www.youtube.com/watch?v=${item.urlVideo}`
            const englishSubtitle = item.englishSubtitle
            const vietnameseSubtitle = item.vietnameseSubtitle
            axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${item.urlVideo}&key=${'AIzaSyDTLfgv7rV1y5IVP45BzfAECkXxxoskm1Q'}&part=snippet,contentDetails,statistics,status`)
                .then(res => {
                    console.log(res.data.items[0])
                    const title = res.data.items[0].snippet.title
                    const thum = res.data.items[0].snippet.thumbnails.maxres.url
                    const duration = formatDuration(parseISO8601Duration(res.data.items[0].contentDetails.duration)).replace('00:', '')
                    const channelName = res.data.items[0].snippet.channelTitle
                    const result: BroadCastYoutubeInterface = { urlVideo, englishSubtitle, vietnameseSubtitle, title, thum, duration, channelName }
                    setBroadCasts([...broadCasts, result])
                })
        })
    }, [datas?.broadCasts])

    useEffect(() => {
        console.log(broadCasts)
    }, [broadCasts])

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