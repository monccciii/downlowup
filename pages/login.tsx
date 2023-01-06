//@ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar'
import { initFirebase, userAccessToken } from '../firebase/firebaseApp';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const app = initFirebase();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);


  return (
    <>
    <Head>
      <title>Login to DownLowUP</title>
      <meta name="description" content="DownLowUP" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/DownLowUPweb.ico" />
    </Head>
    <Navbar />

    <div className='overflow-x-hidden flex h-screen bg-blue-800'>
        <div className='mx-auto my-auto h-screen w-screen'> 
        <div className='rounded-lg p-10 w-full shadow mx-auto'>
        <div className='flex'>
            <div className='w-full z-50 h-[75vh] rounded-lg bg-indigo-500 shadow-lg'>
            <div className='p-5'>
            <p style={{fontWeight:'200'}} className='text-3xl sm:text-7xl text-white text-center'>Login to <span className='border-b-2 border-blue-500'>Down</span><span className='border-b-2 border-yellow-500'>Low</span><span className='border-b-2 border-red-500'>UP</span></p>
            <p style={{fontWeight:'200'}} className='text-xl text-white mt-[2vh] text-center'>Please return back to the <span className='text-yellow-500 underline' onClick={() => router.push('/')}>main page</span> if you are not a DownLowUP admin.</p>
            </div>
            <div className=''>
            <Image src='/wave3.svg' width={1500} height={200} alt=''></Image>
            </div>
            </div>
            <div className='p-5 w-full flex h-[75vh] bg-white rounded-lg shadow-lg'>
                <div className='mx-auto my-auto w-full'>
                <p style={{fontWeight:'200'}} className='text-xl text-black'>Email</p>
                <input
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e:any) => {setEmail(e.target.value)}}
                  />
                <p style={{fontWeight:'200'}} className=' text-xl text-black'>Password</p>
                <input
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e:any) => {setPassword(e.target.value)}}

                  />

                  <div className='flex justify-center gap-8'>
                  <button style={{fontWeight:'600'}} className='text-base bg-green-500 rounded text-white p-2' onClick={() => {
                    signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      // Signed in 
                      const user = userCredential.user;
                      localStorage.setItem("user", JSON.stringify(user.providerData))
                      localStorage.setItem("accessToken", JSON.stringify(user.accessToken))
                      router.push("/panel")
                      // ...
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                    });
                  }}>Login</button>
                  <button style={{fontWeight:'600'}} className='text-base bg-indigo-500 rounded text-white p-2'>Reset Password</button>
                  </div>
                </div>
    
            </div>
        </div>

        </div>
        </div>
    </div>
  </>
  )
}
