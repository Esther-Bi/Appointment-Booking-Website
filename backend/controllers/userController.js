import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import serviceModel from '../models/serviceModel.js'
import appointmentModel from '../models/appointmentModel.js'

// API to register user
const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({success:false, message:"Missing Details"})
        }
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"enter a strong password"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for user login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success:false,message:'User does not exist'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (isMatch) {
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get user profile data
const getProfile = async (req,res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to update user profile
const updateProfile = async (req,res) => {
    try {
        const {userId, name, phone, birthday, gender} = req.body
        if (!name || !phone || !birthday || !gender) {
            return res.json({success:false,message:'Data Missing'})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,birthday,gender})
        res.json({success:true,message:'Profile Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to book appointment
const bookAppointment = async (req,res) => {
    try {
        const {userId, serId, slotDate, slotTime} = req.body
        const serData = await serviceModel.findById(serId)
        const userData = await userModel.findById(userId).select('-password')
        if (userData.birthday === 'Not Selected') {
            return res.json({success:false,message:'You should update your profile before booking'})
        }
        if (!serData.available) {
            return res.json({success:false,message:'Service not available'})
        }
        let slots_booked = serData.slots_booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false,message:'Slot not available'})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        delete serData.slots_booked
        const appointmentData = {
            userId,
            serId,
            userData,
            serData,
            amount: serData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        await serviceModel.findByIdAndUpdate(serId,{slots_booked})
        res.json({success:true,message:'Appointment Booked'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get user appointments for frontend
const listAppointments = async (req,res) => {
    try {
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to cancel appointment
const cancelAppointment = async (req,res) => {
    try {
        const {userId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData.userId !== userId) {
            return res.json({success:false,message:'Unauthorized action'})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        const {serId,slotDate,slotTime} = appointmentData
        const serviceData = await serviceModel.findById(serId)
        let slots_booked = serviceData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!==slotTime)
        await serviceModel.findByIdAndUpdate(serId, {slots_booked})
        res.json({success:true,message:'Appointment Cancelled'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to pay for an appointment
const payment = async (req,res) => {
    try {
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({success:false,message:"Appointment cancelled or not found"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {payment: true})
        res.json({success:true, message: 'Successfully paid'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

export {registerUser , loginUser , getProfile , updateProfile , bookAppointment , listAppointments , cancelAppointment, payment}