import React, { useEffect } from 'react'
import InputText from '../input-text'
import { InputTextInterface } from '../context/interfaces'
import axios from 'axios'
axios.defaults.withCredentials = true

const FormSearchVocabulary = ({ setCurrentWord }: InputTextInterface) => {

    useEffect(() => {
        axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/book')
            .then(res => {
                console.log(res.data)
            })
    }, [])

    return (
        <section className='w-[40%] h-screen'>
            <InputText setCurrentWord={setCurrentWord} />
            <div className='p-[1.5rem]'>
                <p className='font-poppins font-bold text-[2rem] text-[#4dac96]'>Book</p>
                <p className='my-[1rem]'><b>Loại Từ:</b> Danh Từ, Động Từ</p>
                <p className='my-[1rem]'><b>Nghĩa Tiếng Việt:</b> Sách, Mọt Sách, Đặt, Đặt Chỗ</p>
                <div className='my-[1rem] h-[30px] flex items-start'>
                    <b className='w-[20%]'>Phát Âm: </b>
                    <div className='flex w-[80%] flex-wrap font-poppins gap-1'>
                        <button className='ml-4 flex h-[30px] text-[14px] items-center gap-1'>
                            <span className='font-semibold'>David</span>
                            <img src='/EN.png' className='h-[60%]' />
                        </button>
                        <button className='ml-4 flex h-[30px] text-[14px] items-center gap-1'>
                            <span className='font-semibold'>David</span>
                            <img src='/EN.png' className='h-[60%]' />
                        </button>
                        <button className='ml-4 flex h-[30px] text-[14px] items-center gap-1'>
                            <span className='font-semibold'>David</span>
                            <img src='/EN.png' className='h-[60%]' />
                        </button>
                        <button className='ml-4 flex h-[30px] text-[14px] items-center gap-1'>
                            <span className='font-semibold'>David</span>
                            <img src='/EN.png' className='h-[60%]' />
                        </button>
                        <button className='ml-4 flex h-[30px] text-[14px] items-center gap-1'>
                            <span className='font-semibold'>David</span>
                            <img src='/EN.png' className='h-[60%]' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='font-poppins'>
                <button>Add New</button>
            </div>
        </section>
    )
}

export default FormSearchVocabulary