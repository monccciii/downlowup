import Head from 'next/head'
import Image from 'next/image'
import { AiOutlineArrowUp } from 'react-icons/ai'
export default function Bring2top() {
  return (
      <div onClick={() => {document.getElementById('top')?.scrollIntoView({behavior:'smooth'})}} style={{width: 'min-content'}} className='invisible sm:visible bg-slate-800 z-50 text-center text-white rounded-lg top-[2vh] left-[50%] fixed'>
        <div className='p-2'>
      <AiOutlineArrowUp size={20}/>
        </div>
        
      </div>
  )
}
