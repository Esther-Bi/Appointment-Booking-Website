import { createContext, useEffect, useState } from "react";
import axios from 'axios'

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
                setServices(data.services)
            }
        } catch (error) {

        }
    }

    useEffect()

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider