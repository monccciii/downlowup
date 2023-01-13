//@ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar'
import { initFirebase, userAccessToken } from '../firebase/firebaseApp';
import { getDatabase, ref, onValue } from "firebase/database";
import { motion } from 'framer-motion';

export default function Allproperties() {
    const db = getDatabase();
    const app = initFirebase();
    const router = useRouter();
    const [properties, setProperties] = useState();
    
    useEffect(() => {
        try {
        } catch {}
        setInterval(()=>{
          const propertyRef = ref(db, '/properties');
          onValue(propertyRef, (snapshot) => {
            const data = snapshot.val();
            try { const propertyData = Object.entries(data).map(([id, property]) => ({ id, ...property }));
            setProperties(propertyData);
            console.log(properties)
          } catch {setProperties(data);}
          
          })
        }, 1000)
      })

  return (
    <>
    <Head>
      <title>DownLowUP Properties</title>
      <meta name="description" content="DownLowUP" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/DownLowUPweb.ico" />
    </Head>
    <Navbar />
    <div style={{fontFamily:"'Poppins', sans-serif"}}>
        <h1 className='text-center text-5xl mb-5 font-extralight tracking-widest mb-[10vh]'>ALL PROPERTIES</h1>
        <div className='flex'>
            <div className='mx-auto'>
        
        {properties === undefined ? '' : properties.map((property, index) => {
                  return (
                    <motion.div
  initial={{ opacity: 0}}
  whileInView={{ opacity: 1}}
  transition={{ duration: 0.5, type: "tween" }}
  viewport={{ once: true }} key={index} >
       

                    <div className='p-2 z-10 text-transparent bg- text-white rounded transition ease-in-out delay-150 translate-y-1 z-50 hover:scale-110 hover:bg-black duration-300 mb-[5vh]'>
                        <p className='font-extralight'>
                      <Image src={property.image} alt='' width={700} height={500}></Image>
                      <p className='text-center'>{property.address}</p>
                      <p className='text-center'>${property.price}</p>
                    </p> 
                    </div>
                    </motion.div>
                  )
                })}
        </div>
        </div>
        <div className='bg-white h-[10vh] w-[100vw]'>
            <p className='mt-[3vh] text-center'>DownLowUP</p>
            <p className='text-center'>888-728-6795</p>
            <p className='text-center underline decoration-indigo-500' onClick={() => router.push('/panel')}>Panel</p>
            
        </div>
            </div>
  </>
  )
}