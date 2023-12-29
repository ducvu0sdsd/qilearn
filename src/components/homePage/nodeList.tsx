import { motion } from 'framer-motion'
import React from 'react'

const NodeList = ({ url }: { url: string }) => {
    return (
        <motion.div
            initial={{ x: '50px', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}

            className='bg-black rounded-xl overflow-hidden cursor-pointer'>
            <img src={url} width={'100%'} />
        </motion.div>
    )
}

export default NodeList