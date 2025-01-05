import express from 'express'
import { addService,allServices,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/serviceController.js'

const adminRouter = express.Router()

adminRouter.post('/add-service', authAdmin, addService)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-services', authAdmin, allServices)
adminRouter.post('/change-availability', authAdmin, changeAvailablity)


export default adminRouter