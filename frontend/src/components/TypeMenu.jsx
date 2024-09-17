import React from 'react'
import { typeData } from '../assets/assets'
import { Link } from 'react-router-dom'

const TypeMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='type'>
      <h1 className='text-3xl font-medium'>Find By Type</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of services and find your desirable treatment</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {typeData.map((item,index)=>(
            <Link className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={'/services/${item.type}'}>
                <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                <p>{item.type}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default TypeMenu