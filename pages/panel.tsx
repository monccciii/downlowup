//@ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar'
import { userAccessToken } from '../firebase/firebaseApp';
import Panelcomp from '../components/panelcomp';
export default function Panel() {
    const router = useRouter();
    const options = [["Add New Property", "/properties"]]
    useEffect(() => {
      const accessToken = userAccessToken();
      if(!accessToken) {
        router.push('/login')
      }
    }, [])
  return (
    <>
    <Head>
      <title>DownLowUP Admin Panel</title>
      <meta name="description" content="DownLowUP Admin Panel" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/DownLowUPweb.ico" />
    </Head>
    <Navbar />
    <div className='bg-white w-full'>
      <p className='text-center tracking-wide leading-relaxed text-7xl font-light'><span className='border-b-2 border-blue-500'>Down</span><span className='border-b-2 border-yellow-500'>Low</span><span className='border-b-2 border-red-500'>UP</span> Admin Panel</p>
      <div className='flex'>
        {options.map((option, index) => 
          <div className='mx-auto' onClick={() => router.push(option[1])} key={index}>
          <Panelcomp functionality={option} />
          </div>
          )}
      </div>
    </div>
  </>
  )
}
