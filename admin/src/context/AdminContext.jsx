import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import { typeData } from '../../../frontend/src/assets/assets'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [services,setServices] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllServices = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-services', {},{headers:{aToken}})
            if (data.success){
                setServices(data.services)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (serId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {serId}, {headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllServices()
            } else {
               toast.error(data.message) 
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}})
            if (data.success) {
                const appointmentsWithImages = data.appointments.map((item) => {
                    const typeObject = typeData.find(e => e.type === item.serData.type);
                    return {
                        ...item,
                        image: typeObject ? typeObject.image : null,
                    };
                    });
                setAppointments(appointmentsWithImages)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
                getDashData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            let {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
            if (data.success) {
                const dataWithImages = data.dashData.latestAppointments.map((item) => {
                    const typeObject = typeData.find(e => e.type === item.serData.type);
                    return {
                        ...item,
                        image: typeObject ? typeObject.image : null,
                    };
                    });
                data.dashData.latestAppointments = dataWithImages
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    const value ={
        aToken,setAToken,
        backendUrl,services,
        getAllServices, changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData
    }

    return (
        <AdminContext.Provider value={value}>
           {props.children} 
        </AdminContext.Provider>
    )
}

export default AdminContextProvider