import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { typeData } from '../assets/assets'

const MyAppointments = () => {

  const { backendUrl, token, currencySymbol } = useContext(AppContext)
  const [appointments,setAppointments] = useState([])
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])-1] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})
      if (data.success) {
        
        const appointmentsWithImages = data.appointments.map((item) => {
                // Find the matching type object
                const typeObject = typeData.find(e => e.type === item.serData.type);
              
                // Add the image property to the item
                return {
                  ...item,
                  image: typeObject ? typeObject.image : null,  // Add the image or null if not found
                };
              });

        setAppointments(appointmentsWithImages.reverse())
        console.log(appointmentsWithImages)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-24' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.serData.name}</p>
              <p>{item.type}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              <p className='text-sm text-neutral-700 font-medium'>Fee: <span className='text-xs font-light mt-1'>{item.serData.fees}{currencySymbol}</span></p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all duration-300'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments