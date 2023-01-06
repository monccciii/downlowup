//@ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
import Landing from '../components/landing'
import Navbar from '../components/navbar'
import { initFirebase } from '../firebase/firebaseApp'
export default function Home() {
  const app = initFirebase();
  console.log(app)
  return (
    <>
      <Head>
      <title>DownLowUP</title>
      <meta name="description" content="DownLowUP" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/DownLowUPweb.ico" />
    </Head>
      <div className='overflow-x-hidden'>
    <Navbar />
    <Landing />
      </div>
    </>
  )
}
