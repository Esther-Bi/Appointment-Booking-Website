import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import {typeData} from "../../../../frontend/src/assets/assets"

const ServicesList = () => {
    const { services, aToken , getAllServices , changeAvailability } = useContext(AdminContext)
    useEffect( () => {
        if (aToken) {
            getAllServices()
        }
    },[aToken])

    const servicesWithImages = services.map((item) => {
        // Find the matching type object
        const typeObject = typeData.find(e => e.type === item.type);
      
        // Add the image property to the item
        return {
          ...item,
          image: typeObject ? typeObject.image : null,  // Add the image or null if not found
        };
      });

    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
            <h1 className="text-lg font-medium">All Services</h1>
            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                {
                    servicesWithImages.map((item,index)=>(
                        <div className="border border-green-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
                            <img className="bg-headerBG group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
                            <div className="p-4">
                                <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                                <p className="text-zinc-600 text-sm">{item.type}</p>
                                <div className="mt-2 flex item-center gap-1 text-sm">
                                    <input onChange={()=>changeAvailability(item._id)} className="accent-primary" type="checkbox" checked={item.available} />
                                    <p>Available</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ServicesList