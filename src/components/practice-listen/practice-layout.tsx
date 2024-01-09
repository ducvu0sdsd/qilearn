import React, { useEffect, useRef, useState } from 'react'
import { BroadcastInterface } from '../context/interfaces'
import ReactPlayer from 'react-player/lazy'
import { Button } from '@material-tailwind/react'

interface PracticeLayoutInterface {
    currentBroadcast: BroadcastInterface
    setStartTest: React.Dispatch<React.SetStateAction<boolean>>
}

interface TopInterface {
    top: number
    index: number
}

const PracticeLayout = ({ currentBroadcast, setStartTest }: PracticeLayoutInterface) => {

    const reactPlayerRef = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState<boolean>(false)
    const [top, setTop] = useState<TopInterface[]>([])

    const handleOnProgress = () => {
        if (reactPlayerRef.current) {
            const currentTime = reactPlayerRef.current.getCurrentTime()
            currentBroadcast.englishSubtitle.forEach((item, index) => {
                const i = index
                if (currentTime >= item.firstTime && currentTime <= item.lastTime) {
                    const wrapperSub = document.querySelector('.sub-wrapper') as HTMLElement | null
                    const prevSub = document.querySelector(`.sub-${index === 0 ? index : index - 1}`) as HTMLElement | null
                    const currentSub = document.querySelector(`.sub-${index}`) as HTMLElement | null
                    const currentSubEnglish = document.querySelector(`.sub-${index} .english`) as HTMLElement | null
                    const currentSubVietnamese = document.querySelector(`.sub-${index} .vietnamese`) as HTMLElement | null
                    document.querySelector('.sub-active')?.classList.remove('sub-active')
                    document.querySelector('.english-active')?.classList.remove('english-active')
                    document.querySelector('.vietnamese-active')?.classList.remove('vietnamese-active')
                    currentSub?.classList.add('sub-active')
                    if (wrapperSub && currentSub && currentSubEnglish && currentSubVietnamese && prevSub) {
                        wrapperSub.style.marginTop = ((currentSub.offsetHeight) * -index) + 'px';
                        currentSubEnglish.classList.add('english-active')
                        currentSubVietnamese.classList.add('vietnamese-active')
                        const h = top.filter((item, index) => index <= i).reduce((total, current) => total + current.top, 0)
                        wrapperSub.style.marginTop = `-${h - 100}px`
                    }
                }
            })
        }
    }

    useEffect(() => {
        const subs = document.querySelectorAll('.sub') as NodeListOf<HTMLElement>;
        const topSubs: TopInterface[] = []
        subs.forEach((sub, index) => {
            if (sub) {
                const computedStyle = globalThis.window.getComputedStyle(sub);
                const heightWithMargin = sub.offsetHeight + parseFloat(computedStyle.marginTop);
                topSubs.push({
                    index,
                    top: index === 0 ? 0 : heightWithMargin
                })
            }
        })
        setTop(topSubs)
    }, [])

    return (
        <section className='mt-[5rem] mb-[2rem] px-[2rem]'>
            <h1 className='mb-4 font-poppins text-[24px] font-bold'>Test Overview</h1>
            <div className='flex gap-[2rem] w-full'>
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
                        <Button
                            onClick={() => setStartTest(true)}
                            className='text-[23px] font-poppins'
                            placeholder="YourPlaceholderText"
                        >Start The Test</Button>
                    </div>
                </div>
                <div className='w-[40%] h-[550px] border-l-[2px] border-[#efefef] overflow-hidden pl-[2rem]'>
                    <div className={`sub-wrapper transition-all h-full`}>
                        <span
                            className='text-[22px] font-poppins font-semibold'
                        >Are you following your dreams? ⏲️ 6 Minute English</span>
                        {currentBroadcast.englishSubtitle.map((item, index) => (
                            <p
                                className={`min-h-[50px] my-6 justify-center flex flex-col transition-all sub sub-${index}`}
                                key={index}>
                                <span className='font-poppins text-[19px] english'>{item.content}</span>
                                <span className='vietnamese'>{currentBroadcast.vietnameseSubtitle[index].content}</span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PracticeLayout