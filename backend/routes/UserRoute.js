import express from 'express'
import { registerUser , loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, payment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/update-profile',authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment',authUser,payment)


userRouter.get('/get-profile',authUser,getProfile)
userRouter.get('/appointments',authUser,listAppointments)

export default userRouter