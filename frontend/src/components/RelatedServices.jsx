import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedServices = ({serId,type}) => {

    const {services} = useContext(AppContext)
    const navigate = useNavigate()
    const [relSer,setRelSer] = useState([])

    useEffect(()=>{
        if (services.length > 0 && type) {
            const servicesData = services.filter((ser)=> ser.type === type && ser._id !== serId)
            setRelSer(servicesData)
        }
    },[services,serId,type])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Services to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Maybe your choice is one of these</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relSer.slice(0,5).map((item,index)=>(
            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='flex flex-wrap p-2 bg-headerBG border border-primary rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translate-all duration-500' key={index}>
               <img className='w-7' src={item.image} alt="" /> 
               <div className='p-2'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                      <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                <p className='text-gray-900 font-medium'>{item.name}</p>
               </div>
            </div>
        ))}
      </div>
      <button onClick={()=>{ navigate('/services'); scrollTo(0,0)}} className='border border-primary text-gray-600 px-8 py-2 rounded-full mt-3'>more</button>
    </div>
  )
}

export default RelatedServices