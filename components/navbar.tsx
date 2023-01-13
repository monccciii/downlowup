//@ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
export default function Navbar() {
  const checkfordoc = () => {
    const ref1 = document.getElementById("main")
    const ref2 = document.getElementById("services")
    const ref3 = document.getElementById("about")
    const ref4 = document.getElementById("contact")
    return [ref1, ref2, ref3, ref4]
}
const router = useRouter()
const params = router.pathname


  return (
        <div className='p-5 w-full sm:flex sm:text-base sm:justify-between items-center bg-white'> 
        <Image src="/DownLowUPweb.png" alt='DownLowUp' width={100} height={100}
        onClick={() => {
          if (!params) {
          checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})
          } else {
            router.push('/')
            checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})
          }}}></Image>
                <ul style={{fontFamily:"'Poppins', sans-serif"}} className='text-black gap-2  sm:gap-10 flex font-light'>
                <li onClick={() => {
              if (!params) {
              checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})
              } else {
                router.push('/')
                checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})
              }}
            }>Home</li>
            <li onClick={() => {checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})}} className='cursor-pointer'>Services</li>
            <li onClick={() => {checkfordoc()[2]?.scrollIntoView({behavior:'smooth'})}} className='cursor-pointer'>About</li>
            <li onClick={() => {checkfordoc()[3]?.scrollIntoView({behavior:'smooth'})}} className='cursor-pointer'>Contact</li>
            <li onClick={() => router.push('/allproperties')}>Properties</li>

            </ul>
        </div> 
  )
}
