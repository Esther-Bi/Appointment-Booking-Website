import serviceModel from '../models/serviceModel.js'
import jwt from 'jsonwebtoken'

// API for adding service
const addService = async (req,res) => {
    try{
        const { name, type, about, fees } = req.body
        // checking for all data to add service
        if (!name || !type || !about || !fees){
            return res.json({success:false,message:"Missimg Details"})
        }
        const serviceData = {
            name,
            type,
            about,
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

// API to get all services list for admin panel
const allServices = async (req,res) => {
    try {
        const services = await serviceModel.find({}).select()
        res.json({success:true,services})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addService,loginAdmin,allServices}