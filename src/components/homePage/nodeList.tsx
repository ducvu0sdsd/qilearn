import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const NodeList = ({ urlImage, url, reload }: { url: string, urlImage: string, reload: boolean }) => {
    return (
        <motion.div
            initial={{ x: '50px', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}

            className='bg-black rounded-xl overflow-hidden cursor-pointer'>
            {reload ?
                <a href={url}><img src={urlImage} width={'100%'} /></a>
                :
                <Link href={url}><img src={urlImage} width={'100%'} /></Link>
            }
        </motion.div>
    )
}

export default NodeList