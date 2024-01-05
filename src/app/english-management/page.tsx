'use client'
import { WordInterface } from '@/components/context/interfaces';
import FormSearchVocabulary from '@/components/english-management/form-search-vocabulary';
import Footer from '@/components/footer/Footer';
import PrivateNavbar from '@/components/navbar/privateNavbar';
import { getTypes, vocabularies } from '@/utils/translate/translate';
import { useEffect, useState } from 'react';

const EnglishManagement = () => {

    let voices = window.speechSynthesis.getVoices();
    const [currentWord, setCurrentWord] = useState<WordInterface>()

    useEffect(() => console.log(currentWord), [currentWord])

    const speakHandler = () => {
        const utterance = new SpeechSynthesisUtterance('how are you today');
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
        if (typeof window != 'undefined')
            voices = window.speechSynthesis.getVoices();

        // Microsoft David - English(United States)
        // Microsoft Mark - English(United States)
        // Microsoft Zira - English(United States)
        // Google US English
        // Google UK English Female
        // Google UK English Male

        const selectedVoice = voices.find(voice => voice.name === 'Microsoft Mark');
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        if (typeof window != 'undefined')
            window.speechSynthesis.speak(utterance);
    };

    return (
        <>
            <PrivateNavbar />
            <section className='flex py-[5rem] min-h-screen gap-6 px-[1rem]'>
                <FormSearchVocabulary setCurrentWord={setCurrentWord} />
                <div className='h-screen w-[60%] overflow-y-auto relative'>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    English
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Vietnamese
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                            </tr>
                        </thead>
                        <tbody className=' w-[full] bg-black'>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Book
                                </th>
                                <td className="px-6 py-4">
                                    Sách
                                </td>
                                <td className="px-6 py-4">
                                    N
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default EnglishManagement;
