//@ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
export default function Panelcomp(props) {
  return (
      <div className='bg-green-400 mt-[10vh] p-5 rounded-2xl text-white text-boldtransition ease-in-out delay-50 hover:bg-green-500  hover:scale-105  duration-150'>
        <p>{props.functionality}</p>
      </div>
  )
}
