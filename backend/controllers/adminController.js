import serviceModel from '../models/serviceModel.js'
import jwt from 'jsonwebtoken'

// API for adding service
const addService = async (req,res) => {
    try{
        const { name, type, about, available, fees } = req.body
        // checking for all datat to add service
        if (!name || !type || !about || !available || !fees){
            return res.json({success:false,message:"Missimg Details"})
        }
        const serviceData = {
            name,
            type,
            about,
            available,
            fees,
            date:Date.now()
        }
        const newService = new serviceModel(serviceData)
        await newService.save()
        res.json({success:true,message:"Service Added"})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for admin login
const loginAdmin = async (req,res) => {
    try {
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addService,loginAdmin}