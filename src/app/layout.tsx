import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LogoMini from './resources/logo-mini.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QiLearn',
  description: 'Education',
  icons: {
    icon: '/logo-mini.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-white w-[100%] min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  )
}
