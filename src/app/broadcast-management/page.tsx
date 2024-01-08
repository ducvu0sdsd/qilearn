'use client'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import { TypeHTTP, api } from '@/utils/api/api'
import React, { useState } from 'react'

const BroadcastManagement = () => {

    const [vietnameseSelectedFile, setVietnameseSelectedFile] = useState()
    const [englishSelectedFile, setEnglishSelectedFile] = useState()
    const [url, setUrl] = useState('')

    const handleSubmit = () => {
        const formData = new FormData()
        if (englishSelectedFile && vietnameseSelectedFile) {
            formData.append('srtFiles', englishSelectedFile[0]);
            formData.append('srtFiles', vietnameseSelectedFile[0]);
        }

        formData.append('urlVideo', url);
        console.log(formData);
        api({ path: '/broadcasts', type: TypeHTTP.POST, body: formData })
            .then(res => {
                console.log(res)
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