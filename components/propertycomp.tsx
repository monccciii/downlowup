//@ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
import {BsFillTrashFill} from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import { getDatabase, onWrite, remove, ref } from 'firebase/database';
import { useEffect } from 'react';

export default function Propertycomp(props) {
  const db = getDatabase();
  const propertyRef = ref(db, '/properties');

 


  return (
      <div className=' rounded p-4 lg:items-center lg:justify-between border-2 border-black transition ease-in-out delay-50 hover:bg-slate-100 hover:translate-y-1 hover:scale-110  duration-150'>
        <div className=''>
        <Image src={props.image} height={50} width={65} alt=''></Image>
        </div>
        <div className='p-2 font-extralight lg:gap-5 lg:flex lg:items-center lg:justify-between'>
        <p>{props.address}</p>
        <p>${props.price}</p>
        
        <IconContext.Provider
      value={{ color: 'red' }}>
        <div onClick={handleDelete}>
            <BsFillTrashFill />
        </div>
        </IconContext.Provider>
        </div>
    </div>
  )
}
