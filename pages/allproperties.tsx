<<<<<<< HEAD
//@ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar'
import { initFirebase, userAccessToken } from '../firebase/firebaseApp';
import { getDatabase, ref, onValue } from "firebase/database";


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
        <h1 className='text-center text-3xl mb-5 underline '>All Properties</h1>
        <div className='flex'>
            <div className='mx-auto'>
            <div className='grid gap-4 px-10  grid-cols-1 sm:grid-cols-6'>
        
        {properties === undefined ? '' : properties.map((property, index) => {
                  return (
                    <div key={index} className='p-2 text-transparent bg-slate-400 text-black rounded transition ease-in-out delay-150 hover:text-black translate-y-1 z-50 hover:scale-110 hover:bg-slate-100 duration-300'>
                        <p className='font-extralight'>
                      <Image src={property.image} alt='' width={200} height={100}></Image>
                      <p className='text-center'>{property.address}</p>
                      <p className='text-center'>${property.price}</p>
                    </p> 
                    </div>
                  )
                })}
        </div>

        </div>
        </div>
           
            </div>
  </>
  )
}
=======
//@ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar'
import { initFirebase, userAccessToken } from '../firebase/firebaseApp';
import { getDatabase, ref, onValue } from "firebase/database";


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
        <h1 className='text-center text-3xl mb-5 underline '>All Properties</h1>
        <div className='flex'>
            <div className='mx-auto'>
            <div className='grid gap-4 px-10  grid-cols-1 sm:grid-cols-6'>
        
        {properties === undefined ? '' : properties.map((property, index) => {
                  return (
                    <div key={index} className='p-2 text-transparent bg-slate-400 text-black rounded transition ease-in-out delay-150 hover:text-black translate-y-1 z-50 hover:scale-110 hover:bg-slate-100 duration-300'>
                        <p className='font-extralight'>
                      <Image src={property.image} alt='' width={200} height={100}></Image>
                      <p className='text-center'>{property.address}</p>
                      <p className='text-center'>${property.price}</p>
                    </p> 
                    </div>
                  )
                })}
        </div>

        </div>
        </div>
           
            </div>
  </>
  )
}
>>>>>>> 967f4a94c318712f3593d5ec295ca1dba293f1f2
