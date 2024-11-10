import express from 'express'
import { addService } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-service', addService)

export default adminRouter