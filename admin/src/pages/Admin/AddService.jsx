import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {toast} from "react-toastify";
import axios from "axios";

const AddService = () => {

    const [name,setName] = useState('')
    const [type,setType] = useState('Manicure')
    const [fees,setFees] = useState('')
    const [about,setAbout] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/add-service',{name,type,about,fees}, {headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                setName('')
                setType('')
                setFees('')
                setAbout('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">Add Service</p>
            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[-80vh] overflow-y-scroll">
                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>New Service</p>
                            <input onChange={(e)=>setName(e.target.value)} value={name} className="border rounded px-3 py-2" type="text" placeholder="Service" required/>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Type</p>
                            <select onChange={(e)=>setType(e.target.value)} value={type} className="border rounded px-3 py-2" name="" id="">
                                <option value="Manicure">Manicure</option>
                                <option value="Pedicure">Pedicure</option>
                                <option value="Laser">Laser</option>
                                <option value="Facial Treatment">Facial Treatment</option>
                                <option value="Waxing">Waxing</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees</p>
                            <input onChange={(e)=>setFees(e.target.value)} value={fees} className="border rounded px-3 py-2" type="number" placeholder="fees" required/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mt-4 mb-2">About Service</p>
                    <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded" placeholder="write about the given service" rows={5} required/>
                </div>
                <button type='submit' className="bg-primary px-10 py-3 mt-4 text-white rounded-full">Add Service</button>
            </div>
        </form>
    )
}

export default AddService