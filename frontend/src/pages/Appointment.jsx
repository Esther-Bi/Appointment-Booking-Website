import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedServices from '../components/RelatedServices'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const {serId} = useParams()
  const {services, currencySymbol, backendUrl, token, getServicesData} = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [serInfo,setSerInfo] = useState(null)
  const [serSlots,setSerSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchSerInfo = async () => {
    const serInfo = services.find(ser => ser._id === serId)
    setSerInfo(serInfo)
  }

  const getAvailableSlots = async () => {
    setSerSlots([])
    let today = new Date()

    for (let i=0 ; i<7 ; i++){
      let currDate = new Date(today)
      currDate.setDate(today.getDate()+i)
      if (currDate.getDay() === 6) continue

      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)
      if (currDate.getDay() === 5) endTime.setHours(15,0,0,0)

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() > 9 ? currDate.getHours() + 1 : 9)
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currDate.setHours(9)
        currDate.setMinutes(0)
      }

      let timeSlots = []

      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
        
        let day = currDate.getDate()
        let month = currDate.getMonth()+1
        let year = currDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime
        const isSlotAvailable = serInfo.slots_booked[slotDate] && serInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currDate),
            time: formattedTime
          })
        }
        
        currDate.setMinutes(currDate.getMinutes() + 30)
      }

      setSerSlots(prev => ([...prev,timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {
      const date = serSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()
      const slotDate = day + "_" + month + "_" + year
      const {data} = await axios.post(backendUrl + '/api/user/book-appointment', {serId,slotDate,slotTime}, {headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getServicesData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.mwssege)
    }
  }

  useEffect(()=>{
    fetchSerInfo()
  },[services,serId])

  useEffect(()=>{
    getAvailableSlots()
  },[serInfo])

  useEffect(()=>{
    console.log(serSlots)
  },[serSlots])


  return serInfo && (
    <div>
      {/*Service Details*/}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={serInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/*Ser Info*/}
          <p className='text-2xl font-medium text-gray-900'>{serInfo.name}</p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{serInfo.type}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{serInfo.available ? 'Available' : 'Not Available'}</button>
          </div>
          {/*Service About*/}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{serInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Service Fee: <span>{serInfo.fees}{currencySymbol}</span>
          </p>
        </div>
      </div>
      {/*Booking Slots*/}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Available Appointments</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            serSlots.length && serSlots.map((item,index)=>(
              <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {serSlots.length && serSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book This Appointment</button>
      </div>
      {/*Listing Related Services*/}
      <RelatedServices serId={serId} type={serInfo.type} />
    </div>
  )
}

export default Appointment