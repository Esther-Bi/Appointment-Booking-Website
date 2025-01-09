import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const {userData,setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)
  const [isEdit,setIsEdit] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/update-profile',userData,{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={assets.profile_pic} alt="" />
      {
        isEdit
        ? <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev =>({...prev,name:e.target.value}))}/>
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-500 mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email:</p>
          <p className='text-primary'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
            ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev =>({...prev,phone:e.target.value}))}/>
            : <p className='text-primary'>{userData.phone}</p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 mt-3'>BASIC IMFORMATION:</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
            ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({...prev,gender:e.target.value}))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            : <p className='text-primary'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
            {
              isEdit
              ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({...prev,birthday:e.target.value}))} value={userData.birthday}/>
              : <p className='text-primary'>{userData.birthday}</p>
            }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
          ? <button className='bg-primary text-white px-8 py-2 rounded-full  hover:bg-gray-100 hover:text-black hover:border hover:border-primary transition-all' onClick={updateUserProfileData}>save information</button>
          : <button className='bg-primary text-white px-8 py-2 rounded-full  hover:bg-gray-100 hover:text-black hover:border hover:border-primary transition-all' onClick={()=>setIsEdit(true)}>edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile