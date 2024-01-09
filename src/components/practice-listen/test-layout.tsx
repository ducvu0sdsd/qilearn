import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { BroadcastInterface } from '../context/interfaces';

interface TestLayoutInterface {
    currentBroadcast: BroadcastInterface
}

const TestLayout = ({ currentBroadcast }: TestLayoutInterface) => {

    const reactPlayerRef = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState<boolean>(false)

    const handleOnProgress = () => {

    }

    return (
        <section className='mt-[5rem] mb-[2rem] px-[2rem]'>
            <h1 className='mb-4 font-poppins text-[24px] font-bold'>Test Overview</h1>
            <div className='flex gap-[2rem] w-full'>
                <div className='w-[40%] h-[550px] border-r-[2px] border-[#efefef] overflow-hidden pl-[2rem]'>

                </div>
                <div className='w-[60%]'>
                    <div className='w-full rounded-lg overflow-hidden h-[395px]'>
                        <ReactPlayer
                            config={{
                                youtube: {
                                    playerVars: {
                                        rel: 0, // Tắt gợi ý video liên quan 
                                        fs: 0,
                                    },
                                },
                                facebook: {
                                    appId: '12345'
                                }
                            }}
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            controls
                            url={currentBroadcast.urlVideo}
                            ref={reactPlayerRef}
                            width={'100%'}
                            height={'100%'}
                            progressInterval={1}
                            onProgress={() => handleOnProgress()}
                        />
                    </div>
                    <h2 className='font-poppins text-[21px] mt-4 font-semibold'>{currentBroadcast.title}</h2>
                    <h3 className='font-poppins mt-1 text-[18px]'><b>From </b>{currentBroadcast.channelName}</h3>
                    <div className='my-4 w-full flex justify-end'>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestLayout