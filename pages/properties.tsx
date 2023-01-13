<<<<<<< HEAD
//@ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/navbar'
import { userAccessToken } from '../firebase/firebaseApp';
import Panelcomp from '../components/panelcomp';
import Propertycomp from '../components/propertycomp';
import {AiOutlinePlus} from 'react-icons/ai'
import { getDatabase, onValue, ref, set, push, update } from "firebase/database";
import {BsFillTrashFill} from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'

export default function Properties() {
  const db = getDatabase();
    const router = useRouter();
    const fileRef = useRef();
    const fileRef2 = useRef();

    const [modalOpen, setmodalOpen] = useState(false);
    const toggle = () => setmodalOpen(!modalOpen);
    useEffect(() => { 
      const accessToken = userAccessToken();
      if(!accessToken) {
        router.push('/')
      }
    }, [])

    const convert2base64 = (inputfile) => {
      const file = inputfile
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewPropertyimage(reader.result.toString());      }
        reader.readAsDataURL(file)

    }
    const convert2base642 = (inputfile) => {
      const file = inputfile
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditednewPropertyimage(reader.result.toString());      }
        reader.readAsDataURL(file)

    }

    function writePropertydata() {
      const reference = ref(db, 'properties/');
      const newPropertyRef = push(reference);


      set(newPropertyRef, {
        address:newPropertyaddress,
        price:newPropertyprice,
        image:newPropertyimage
      })
    }

    const deleteProperty = (id) => {
      const propertyRef = ref(db, `/properties/${id}`);
      set(propertyRef, null);
    }
    
    const handleTrashClick = (id) => {
      deleteProperty(id);
    }
   
    const [properties, setProperties] = useState([]);
    const [propertyInfo, setPropertyInfo] = useState('');
    
    const [newPropertyaddress, setNewPropertyaddress] = useState();
    const [newPropertyprice, setNewPropertyprice] = useState();
    const [newPropertyimage, setNewPropertyimage] = useState();

    const [editedPropertyaddress, setEditednewPropertyaddress] = useState();
    const [editedPropertyprice, setEditednewPropertyprice] = useState(null);
    const [editedPropertyimage, setEditednewPropertyimage] = useState();
    
    setInterval(()=>{
      const propertyRef = ref(db, '/properties');
      onValue(propertyRef, (snapshot) => {
        const data = snapshot.val();
        try { const propertyData = Object.entries(data).map(([id, property]) => ({ id, ...property }));
        setProperties(propertyData);
      } catch {setProperties(data);}
      
      })
    }, 1000)


    function EditProperty(id) {
      if (id === undefined) {
        return
      } else {
      const propertyRef = ref(db, `/properties/${id}`);
      if (editedPropertyaddress) {
        update(propertyRef, {
          address:editedPropertyaddress,
        }
          );
      }
      if (editedPropertyprice) {
        update(propertyRef, {
          price:editedPropertyprice,
        }
          );
      }
      if (editedPropertyimage) {
        update(propertyRef, {
          image:editedPropertyimage,
        }
          );
      }
      
    }
    }

    function resetAllvals() {
      document.getElementById('inp1').value = '';
      document.getElementById('inp2').value = '';
      document.getElementById('inp3').value = '';
    }
    function isInt(value) {
      if (value === '') {
        return true;
      }
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }

  return (
    <>
    <Head>
      <title>DownLowUP Properties Dashboard</title>
      <meta name="description" content="DownLowUP Properties Dashboard" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/DownLowUPweb.ico" />
    </Head>
    <Navbar />
    
    <div className='bg-white w-full '>
      <p className='text-center tracking-wide leading-relaxed text-7xl font-light'><span className='border-b-2 border-blue-500'>Down</span><span className='border-b-2 border-yellow-500'>Low</span><span className='border-b-2 border-red-500'>UP</span> Properties Dashboard</p>
      <div onClick={() => setmodalOpen(true)} className='bg-green-500 transition ease-in-out delay-50 hover:bg-green-400  hover:scale-105  duration-150 inline-block rounded ml-1 p-2 text-white'>
        <div className='flex items-center gap-2'>
        <AiOutlinePlus />
        <p>Add New Property</p>
        </div>
        
      </div>
      {modalOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  
                  <h3 className="text-3xl font-extralight">
                    Add a new property.
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setmodalOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <p className='font-light'>Location:</p>
                <input onChange={(e) => setNewPropertyaddress(e.target.value)} className='w-full px-5 bg-white text-black shadow text-center'/> 
                <p className='font-light'>Price:</p>
                <input onChange={(e) => setNewPropertyprice (e.target.value)}className='w-full px-5 bg-white text-black shadow text-center'/> 
                <p className='font-light'>Image:</p>
                <input onChange={(e) => convert2base64(e.target.files[0])} className='invisible'ref={fileRef} type='file' />
                <div onClick={() => fileRef.current.click()} className='bg-blue-500 rounded-full text-center p-2 text-white'>Click to Insert Image</div>
                {newPropertyimage ? <div className='bg-green-500 rounded text-center p-2 text-white'>Successfully uploaded!</div> : ''}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setmodalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => writePropertydata()}
                  >
                    Add Property
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className='grid grid-cols-5 w-full h-[70vh]'>

        <div className='grid grid-rows border-2 w-full border-black overflow-auto scrollbar-hide'>
        {properties === null ? '' :
          properties.map((property) => {
            return (
              <div onClick={() => setPropertyInfo([property.id, property.address, property.price])} key={property.id} className=' rounded p-4 lg:items-center lg:justify-between border-2 border-black transition ease-in-out delay-50 hover:bg-slate-100 hover:translate-y-1 hover:scale-110  duration-150'>
        <div className=''>
        <Image src={property.image} height={50} width={65} alt=''></Image>
        </div>
        <div className='p-2 font-extralight lg:gap-5 lg:flex lg:items-center lg:justify-between'>
        <p>{property.address}</p>
        <p>${property.price}</p>
        
        <IconContext.Provider
      value={{ color: 'red' }}>
        <div onClick={() => handleTrashClick(property.id)}>
            <BsFillTrashFill />
        </div>
        </IconContext.Provider>
        </div>
    </div>
            )
          })
        }

        </div>

        <div className='flex border-2 border-l-0 col-span-4 border-blue-500 w-full'>
            {propertyInfo === undefined ?  '' : <div className='mx-auto text-center'>
              <p className='mx-auto mt-[1vh] text-4xl font-light'>{propertyInfo[1]}</p>
              <p className='mt-[5vh] mx-auto font-extralight'>Address:</p>
              <input id='inp1' placeholder={propertyInfo[1]} onChange={(e) => setEditednewPropertyaddress(e.target.value)} className='border-2 px-2 w-[60vw] mx-auto border-black rounded-2xl'></input> <br/>
              <p className='mx-auto mt-[5vh] font-extralight'>Price:</p>
              <input id='inp2' placeholder={propertyInfo[2]} onChange={(e) => setEditednewPropertyprice(e.target.value)} className='px-2 border-2 w-[60vw] mx-auto border-black rounded-2xl'></input> 
              {editedPropertyprice !== null ? isInt(editedPropertyprice) ? '' : <p className='bg-red-500 text-white rounded p-1'>Please only put numbers.</p> : ''}

              <br/>
              <input id='inp3' type='file' ref={fileRef2} onChange={(e) => convert2base642(e.target.files[0])} className=' w-[60vw] mx-auto invisible rounded-2xl'></input>
              <p className='mx-auto mt-[5vh] font-extralight'>Image:</p>
              <div className='bg-blue-500 rounded-full text-center p-2 text-white' onClick={() =>  fileRef2.current.click()}>Click to Insert Image</div>
              <div className='bg-green-500 rounded-full text-center p-2 mt-[5vh] text-white' onClick={() => {
                EditProperty(propertyInfo[0])
                window.location.reload();
              }} >Submit Edits</div>
              </div>}
        </div>
      </div>
      <div className='h-[5vh] lg:h-[0vh]]'></div>
    </div>
  </>
  )
}
=======
//@ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/navbar'
import { userAccessToken } from '../firebase/firebaseApp';
import Panelcomp from '../components/panelcomp';
import Propertycomp from '../components/propertycomp';
import {AiOutlinePlus} from 'react-icons/ai'
import { getDatabase, onValue, ref, set, push, update } from "firebase/database";
import {BsFillTrashFill} from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'

export default function Properties() {
  const db = getDatabase();
    const router = useRouter();
    const fileRef = useRef();
    const fileRef2 = useRef();

    const [modalOpen, setmodalOpen] = useState(false);
    const toggle = () => setmodalOpen(!modalOpen);
    useEffect(() => { 
      const accessToken = userAccessToken();
      if(!accessToken) {
        router.push('/')
      }
    }, [])

    const convert2base64 = (inputfile) => {
      const file = inputfile
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewPropertyimage(reader.result.toString());      }
        reader.readAsDataURL(file)

    }
    const convert2base642 = (inputfile) => {
      const file = inputfile
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditednewPropertyimage(reader.result.toString());      }
        reader.readAsDataURL(file)

    }

    function writePropertydata() {
      const reference = ref(db, 'properties/');
      const newPropertyRef = push(reference);


      set(newPropertyRef, {
        address:newPropertyaddress,
        price:newPropertyprice,
        image:newPropertyimage
      })
    }

    const deleteProperty = (id) => {
      const propertyRef = ref(db, `/properties/${id}`);
      set(propertyRef, null);
    }
    
    const handleTrashClick = (id) => {
      deleteProperty(id);
    }
   
    const [properties, setProperties] = useState([]);
    const [propertyInfo, setPropertyInfo] = useState('');
    
    const [newPropertyaddress, setNewPropertyaddress] = useState();
    const [newPropertyprice, setNewPropertyprice] = useState();
    const [newPropertyimage, setNewPropertyimage] = useState();

    const [editedPropertyaddress, setEditednewPropertyaddress] = useState();
    const [editedPropertyprice, setEditednewPropertyprice] = useState(null);
    const [editedPropertyimage, setEditednewPropertyimage] = useState();
    
    setInterval(()=>{
      const propertyRef = ref(db, '/properties');
      onValue(propertyRef, (snapshot) => {
        const data = snapshot.val();
        try { const propertyData = Object.entries(data).map(([id, property]) => ({ id, ...property }));
        setProperties(propertyData);
      } catch {setProperties(data);}
      
      })
    }, 1000)


    function EditProperty(id) {
      if (id === undefined) {
        return
      } else {
      const propertyRef = ref(db, `/properties/${id}`);
      if (editedPropertyaddress) {
        update(propertyRef, {
          address:editedPropertyaddress,
        }
          );
      }
      if (editedPropertyprice) {
        update(propertyRef, {
          price:editedPropertyprice,
        }
          );
      }
      if (editedPropertyimage) {
        update(propertyRef, {
          image:editedPropertyimage,
        }
          );
      }
      
    }
    }

    function resetAllvals() {
      document.getElementById('inp1').value = '';
      document.getElementById('inp2').value = '';
      document.getElementById('inp3').value = '';
    }
    function isInt(value) {
      if (value === '') {
        return true;
      }
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }

  return (
    <>
    <Head>
      <title>DownLowUP Properties Dashboard</title>
      <meta name="description" content="DownLowUP Properties Dashboard" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/DownLowUPweb.ico" />
    </Head>
    <Navbar />
    
    <div className='bg-white w-full '>
      <p className='text-center tracking-wide leading-relaxed text-7xl font-light'><span className='border-b-2 border-blue-500'>Down</span><span className='border-b-2 border-yellow-500'>Low</span><span className='border-b-2 border-red-500'>UP</span> Properties Dashboard</p>
      <div onClick={() => setmodalOpen(true)} className='bg-green-500 transition ease-in-out delay-50 hover:bg-green-400  hover:scale-105  duration-150 inline-block rounded ml-1 p-2 text-white'>
        <div className='flex items-center gap-2'>
        <AiOutlinePlus />
        <p>Add New Property</p>
        </div>
        
      </div>
      {modalOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  
                  <h3 className="text-3xl font-extralight">
                    Add a new property.
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setmodalOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <p className='font-light'>Location:</p>
                <input onChange={(e) => setNewPropertyaddress(e.target.value)} className='w-full px-5 bg-white text-black shadow text-center'/> 
                <p className='font-light'>Price:</p>
                <input onChange={(e) => setNewPropertyprice (e.target.value)}className='w-full px-5 bg-white text-black shadow text-center'/> 
                <p className='font-light'>Image:</p>
                <input onChange={(e) => convert2base64(e.target.files[0])} className='invisible'ref={fileRef} type='file' />
                <div onClick={() => fileRef.current.click()} className='bg-blue-500 rounded-full text-center p-2 text-white'>Click to Insert Image</div>
                {newPropertyimage ? <div className='bg-green-500 rounded text-center p-2 text-white'>Successfully uploaded!</div> : ''}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setmodalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => writePropertydata()}
                  >
                    Add Property
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className='grid grid-cols-5 w-full h-[70vh]'>

        <div className='grid grid-rows border-2 w-full border-black overflow-auto scrollbar-hide'>
        {properties === null ? '' :
          properties.map((property) => {
            return (
              <div onClick={() => setPropertyInfo([property.id, property.address, property.price])} key={property.id} className=' rounded p-4 lg:items-center lg:justify-between border-2 border-black transition ease-in-out delay-50 hover:bg-slate-100 hover:translate-y-1 hover:scale-110  duration-150'>
        <div className=''>
        <Image src={property.image} height={50} width={65} alt=''></Image>
        </div>
        <div className='p-2 font-extralight lg:gap-5 lg:flex lg:items-center lg:justify-between'>
        <p>{property.address}</p>
        <p>${property.price}</p>
        
        <IconContext.Provider
      value={{ color: 'red' }}>
        <div onClick={() => handleTrashClick(property.id)}>
            <BsFillTrashFill />
        </div>
        </IconContext.Provider>
        </div>
    </div>
            )
          })
        }

        </div>

        <div className='flex border-2 border-l-0 col-span-4 border-blue-500 w-full'>
            {propertyInfo === undefined ?  '' : <div className='mx-auto text-center'>
              <p className='mx-auto mt-[1vh] text-4xl font-light'>{propertyInfo[1]}</p>
              <p className='mt-[5vh] mx-auto font-extralight'>Address:</p>
              <input id='inp1' placeholder={propertyInfo[1]} onChange={(e) => setEditednewPropertyaddress(e.target.value)} className='border-2 px-2 w-[60vw] mx-auto border-black rounded-2xl'></input> <br/>
              <p className='mx-auto mt-[5vh] font-extralight'>Price:</p>
              <input id='inp2' placeholder={propertyInfo[2]} onChange={(e) => setEditednewPropertyprice(e.target.value)} className='px-2 border-2 w-[60vw] mx-auto border-black rounded-2xl'></input> 
              {editedPropertyprice !== null ? isInt(editedPropertyprice) ? '' : <p className='bg-red-500 text-white rounded p-1'>Please only put numbers.</p> : ''}

              <br/>
              <input id='inp3' type='file' ref={fileRef2} onChange={(e) => convert2base642(e.target.files[0])} className=' w-[60vw] mx-auto invisible rounded-2xl'></input>
              <p className='mx-auto mt-[5vh] font-extralight'>Image:</p>
              <div className='bg-blue-500 rounded-full text-center p-2 text-white' onClick={() =>  fileRef2.current.click()}>Click to Insert Image</div>
              <div className='bg-green-500 rounded-full text-center p-2 mt-[5vh] text-white' onClick={() => {
                EditProperty(propertyInfo[0])
                window.location.reload();
              }} >Submit Edits</div>
              </div>}
        </div>
      </div>
      <div className='h-[5vh] lg:h-[0vh]]'></div>
    </div>
  </>
  )
}
>>>>>>> 967f4a94c318712f3593d5ec295ca1dba293f1f2
