import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Services = () => {

  const { type } = useParams()
  const [filterSer, setFilterSer] = useState([])
  const [showFilter,setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { services } = useContext(AppContext)

  const applyFilter = () => {
    if (type) {
      setFilterSer(services.filter(ser => ser.type === type))
    } else {
      setFilterSer(services)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[services,type])

  return (
    <div>
      <p className='text-gray-600'>Browse through the services type</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> type === 'Laser' ? navigate('/services') : navigate('/services/Laser')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === "Laser" ? "bg-primary text-white " : ""}}`}>Laser</p>
          <p onClick={()=> type === 'Manicure' ? navigate('/services') : navigate('/services/Manicure')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === "Manicure" ? "bg-primary text-white " : ""}}`}>Manicure</p>
          <p onClick={()=> type === 'Pedicure' ? navigate('/services') : navigate('/services/Pedicure')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === "Pedicure" ? "bg-primary text-white " : ""}}`}>Pedicure</p>
          <p onClick={()=> type === 'Facial Treatment' ? navigate('/services') : navigate('/services/Facial Treatment')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === "Facial Treatment" ? "bg-primary text-white " : ""}}`}>Facial Treatment</p>
          <p onClick={()=> type === 'Waxing' ? navigate('/services') : navigate('/services/Waxing')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === "Waxing" ? "bg-primary text-white " : ""}}`}>Waxing</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterSer.map((item,index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='h-20 flex flex-wrap p-2 bg-headerBG border border-primary rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translate-all duration-500' key={index}>
                 <img className='w-7' src={item.image} alt="" /> 
                 <div className='p-2'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                      <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                  </div>
                  <p className='text-gray-900 font-medium'>{item.name}</p>
                 </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Services