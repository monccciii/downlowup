
// @ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import saturatedbg from '../public/saturatedbg.png'
import { useEffect, useState } from 'react'
import Bring2top from './bring2top.tsx'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { useRouter } from 'next/router'
import { getDatabase, ref, onValue } from "firebase/database";

export default function Landing() {
  const db = getDatabase();
    const form = useRef();
    const router = useRouter();
    const [isSent, setIsSent] = useState(null);;
    const [properties, setProperties] = useState();
    

     const sendEmail = (e:any) => {
        e.preventDefault();

        emailjs.sendForm('service_o75yon9', 'template_76e1ttp', form.current, 'qxGDpARSEwX-KcX_J')
          .then((result) => {
              console.log(result.text);
              setIsSent(true);
              setTimeout(setIsSent(''), 2000);
        
          }, (error) => {
              console.log(error.text);
              setIsSent(false);
              setTimeout(setIsSent(''), 2000);
             
          });
        document.getElementById('namebox').value=''
        document.getElementById('emailbox').value=''
        document.getElementById('messagebox').value=''
    }

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
    <div className='scrollbar-hide'>
      <div className='w-full overflow-x-hidden ' id='top' style={{fontFamily:"'Poppins', sans-serif", fontWeight:'200'}}>
      

        <div id='main' className='grid grid-cols-1 lg:grid-cols-3'>
        <p className='text-5xl text-center md:text-7xl lg:text-9xl py-10 sm:px-10 drop-shadow-lg'>Welcome&nbsp;to <br /> <span style={{fontWeight:'300'}}><span className='border-b-2 border-blue-500'>Down</span><span className='border-b-2 border-yellow-500'>Low</span><span className='border-b-2 border-red-500'>UP</span>.</span></p>
        <div>
          
        </div>
        <div className='p-20' >
        <Image src="/prelayered.png" width={1000} height={720} alt=''></Image>
        </div>
        </div>
        <motion.div
  initial={{ opacity: 0}}
  whileInView={{ opacity: 1}}
  transition={{ duration: 1, type: "tween" }}
  viewport={{ once: true }}>
        <p className='pl-20 text-3xl sm:text-4xl'>Find rental properties in <span style={{fontWeight:'400'}}>seconds</span>.</p>
        </motion.div>


        <div className='w-[70vw] mt-[15vh] m-auto break-words'>
        <p className='text-2xl sm:text-3xl text-center'>Imagine a place where you can just make one call and find the rental property of your dreams. <br /> Well, <span style={{fontWeight:'400'}}>DownLowUP</span> is that place!</p>
        </div>
        <div className=' mt-[10vh] w-full'>
        <ul className='text-white z-10 list-none justify-evenly flex'>
        <motion.div
  initial={{ opacity: 0}}
  whileInView={{ opacity: 1}}
  transition={{ duration: 1, type: "tween" }}
  viewport={{ once: true }}>
                <li className='p-3 rounded bg-black transition ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 tracking-widest'>EXPLORE PROPERTIES.</li>
                </motion.div>
                <li className='p-3 rounded'>Step 2</li>
                <motion.div
  initial={{ opacity: 0}}
  whileInView={{ opacity: 1}}
  transition={{ duration: 5, type: "tween" }}
  viewport={{ once: true }}>
                <li className='p-3 rounded bg-black transition ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 tracking-widest'>SCHEDULE A WALKTHROUGH</li>
                </motion.div>
                <li className='p-3 rounded'>Step 4</li>
            </ul>

            <div style={{zIndex:'-1'}} className='w-full h-full'>
            <motion.div
  initial={{ opacity: 0, width:0 }}
  whileInView={{ opacity: 1, width:'100vw'}}
  transition={{ duration: 3, type: "tween" }}
  viewport={{ once: true }}>
    
        <Image src="/Arrow.svg" width={1900} height={200} className='w-[97%] sm:w-[98%]' alt=''></Image> 
        
        </motion.div>

            </div>
            <ul className='text-white mb-[50vh] z-10 list-none justify-evenly flex'>
                <li className='p-3 rounded'>Step 1<br/></li>
                <motion.div
  initial={{ opacity: 0}}
  whileInView={{ opacity: 1}}
  transition={{ duration: 4, type: "tween" }}
  viewport={{ once: true }}>
                <li className='p-3 rounded bg-black transition ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 tracking-widest'>FIND THE PROPERTY YOU LOVE.</li>
                </motion.div>
                <li className='p-3 rounded'>Step 3</li>
                <motion.div
  initial={{ opacity: 0}}
  whileInView={{ opacity: 1}}
  transition={{ duration: 6, type: "tween" }}
  viewport={{ once: true }}>
                <li className='p-3 rounded bg-black transition ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 tracking-widest'>GET INTO YOUR NEW HOME!</li>
                </motion.div>
            </ul>


        </div>
        
        <motion.div
  initial={{ opacity: 0}}
  whileInView={{ opacity: 1}}
  transition={{ duration: 0.3, type: "tween" }}>
    <Bring2top />





        <div className='w-[100vw]  bg-white'>
        <motion.div
  initial={{ opacity: 0, marginTop:0}}
  whileInView={{ opacity: 1, marginTop:'20vh', textShadow:'-2px 1px'}}
  transition={{ duration: 2, type: "tween" }}>
            <div className='text-7xl text-center text-black' id='about'><p>A B O U T</p></div>
            </motion.div>
            <div>
                <p className='mt-[10vh] text-center text-3xl mx-auto w-[70vw]'><span style={{fontWeight:'400'}}>DownLowUP</span> prides itself on transparency with its tenants to make anyone’s experience the best it can be. Customer loyalty is the most important thing for everyone to feel good about working with any company or group. In addition, the level of care we put in our properties ensures they are comfortable and feel at home.</p>
                
                
                
            </div>
        </div>




        <div className='mt-[50vh] w-[100vw] h-[110vh] bg-black'>
            <div className='h-[2vh]'></div>
        <motion.div
  initial={{ opacity: 0, marginTop:0}}
  whileInView={{ opacity: 1, marginTop:'20vh', textShadow:'-2px 1px'}}
  transition={{ duration: 2, type: "tween" }}>
            <div className='text-7xl text-center text-white' id='contact'><p>Contact</p></div>
            </motion.div>
            <p className='mt-[5vh] text-xl text-white text-center'>We&apos;re always here and ready to help. Leave us a message here!</p>
            <div className='mt-[5vh] p-5 bg-white rounded h-[50vh] w-[90vw] sm:w-[50vw] mx-auto'>
            <form ref={form} onSubmit={sendEmail}>
                <p className='text-2xl'>Name:</p>
                <input
                    id='namebox'
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    type="text" name="user_name"
                  />
                <p className='text-2xl'>Email:</p>
                <input
                    id='emailbox'
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    type="email" name="user_email"
                  />
                <p className='text-2xl'>Message:</p>
                <textarea
                    id='messagebox'
                    className="w-full bg-gray-100 rounded border border-black focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    name="message"
                  ></textarea>
                  <div className='flex'>
                  <input className='bg-black text-white mx-auto rounded-lg pl-5 pr-5 pt-2 pb-2 hover:-translate-y+3 hover:scale-110 hover:bg-[#454545] duration-300 overflow-hidden cursor-pointer' type="submit" value='Send'></input>
                  </div>
                  </form>
    

            </div>

            {isSent === null ? '' : 
                (isSent === true) ? <p className='fixed bottom-0 w-full bg-green-500 p-5 rounded-lg text-center text-white'>Successfully sent! Please wait for a reply.</p> : <p className='fixed bottom-0 w-full bg-red-500 p-5 rounded-lg text-center text-white'>Unsuccessfully sent. Please try again.</p>}

        </div>
        <div className='bg-white h-[10vh] w-[100vw] shadow-2xl'>
            <p className='mt-[3vh] text-center'>DownLowUP</p>
            <p className='text-center'>888-728-6795</p>            
        </div>
        </motion.div>
      </div>
      </div>
  )
}
