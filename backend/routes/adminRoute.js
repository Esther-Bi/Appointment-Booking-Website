import express from 'express'
import { addService,allServices,loginAdmin,appointmentsAdmin,appointmentCancelAdmin,appointmentCompleteAdmin,adminDashboard } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/serviceController.js'

const adminRouter = express.Router()

adminRouter.post('/add-service', authAdmin, addService)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-services', authAdmin, allServices)
adminRouter.post('/change-availability', authAdmin, changeAvailablity)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancelAdmin)
adminRouter.post('/complete-appointment', authAdmin, appointmentCompleteAdmin)

adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.get('/dashboard', authAdmin, adminDashboard)


export default adminRouter