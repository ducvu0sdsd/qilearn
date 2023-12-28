'use client'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/navbar'
import FourthSection from '@/components/publicPage/FourthSection'
import HeadSection from '@/components/publicPage/HeadSection'
import SecondSection from '@/components/publicPage/SecondSection'
import ThirdSection from '@/components/publicPage/ThirdSection'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  const { data: session, status, update } = useSession()
  if (status === 'authenticated') {
    signOut()
  }
  return (
    <>
      <Navbar />
      <HeadSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </>
  )
}
