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
      <div id='top' className='flex justify-between p-5'>
        <Image src="/DownLowUPweb.png" alt='DownLowUp' width={100} height={100}
        onClick={() => {
          if (!params) {
          checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})
          } else {
            router.push('/')
            checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})
          }}}></Image>
        <ul style={{fontFamily:"'Poppins', sans-serif", fontWeight:'400'}} className='text-black gap-5 sm:gap-10 flex'>
            <li onClick={() => {
              if (!params) {
              checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})
              } else {
                router.push('/')
                checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})
              }}
            }>Home</li>
            <li onClick={() => {checkfordoc()[1]?.scrollIntoView({behavior:'smooth'})}}>Services</li>
            <li onClick={() => {checkfordoc()[2]?.scrollIntoView({behavior:'smooth'})}}>About</li>
            <li onClick={() => {checkfordoc()[3]?.scrollIntoView({behavior:'smooth'})}}>Contact</li>
        </ul>
      </div>
  )
}
