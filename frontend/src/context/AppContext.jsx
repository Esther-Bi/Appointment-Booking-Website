import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import {typeData} from "../assets/assets"

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₪'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [services,setServices] = useState([])

    const value = {
        services,
        currencySymbol
    }

    const getServicesData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/service/list')
            if (data.success) {
                const servicesWithImages = data.services.map((item) => {
                        const typeObject = typeData.find(e => e.type === item.type);
                        return {
                          ...item,
                          image: typeObject ? typeObject.image : null,  // Add the image or null if not found
                        };
                      });
                setServices(servicesWithImages)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getServicesData()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider