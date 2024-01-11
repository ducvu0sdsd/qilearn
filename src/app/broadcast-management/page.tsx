'use client'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import { TypeHTTP, api } from '@/utils/api/api'
import { formatDuration, parseISO8601Duration } from '@/utils/broadcast/time'
import axios from 'axios'
import React, { useState } from 'react'

const BroadcastManagement = () => {

    const [vietnameseSelectedFile, setVietnameseSelectedFile] = useState()
    const [englishSelectedFile, setEnglishSelectedFile] = useState()
    const [url, setUrl] = useState('')

    const handleSubmit = async () => {

        const urlVideo = `https://www.youtube.com/watch?v=${url}`
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${url}&key=${'AIzaSyDTLfgv7rV1y5IVP45BzfAECkXxxoskm1Q'}&part=snippet,contentDetails,statistics,status`)
        const title = res.data.items[0].snippet.title
        const thum = res.data.items[0].snippet.thumbnails.maxres.url
        const duration = formatDuration(parseISO8601Duration(res.data.items[0].contentDetails.duration)).replace('00:', '')
        const channelName = res.data.items[0].snippet.channelTitle

        const formData = new FormData()
        if (englishSelectedFile && vietnameseSelectedFile) {
            formData.append('srtFiles', englishSelectedFile[0]);
            formData.append('srtFiles', vietnameseSelectedFile[0]);
        }
        formData.append('urlVideo', urlVideo);
        formData.append('title', title)
        formData.append('thum', thum)
        formData.append('duration', duration)
        formData.append('channelName', channelName)

        api({ path: '/broadcasts', type: TypeHTTP.POST, body: formData })
            .then(res => {
                const result: any = res
                alert(`Englishs : ${result.englishSubtitle.length} - Vietnamese : ${result.vietnameseSubtitle.length
                    }`)
            })
    }

    return (
        <>
            <PrivateNavbar />
            <section className='py-[5rem]'>
                <div>PracticeListen</div>
                English<input type='file' accept='.srt' onChange={(e: any) => setEnglishSelectedFile(e.target.files)} />
                Vietnamese<input type='file' accept='.srt' onChange={(e: any) => setVietnameseSelectedFile(e.target.files)} />
                URLVideo<input type='text'
                    onChange={(e) => setUrl(e.target.value)}
                    className='border-[1px] border-[#999]' />
                <button
                    onClick={() => handleSubmit()}
                >Submit</button>
            </section>
            <Footer />
        </>
    )
}

export default BroadcastManagement