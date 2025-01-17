import serviceModel from "../models/serviceModel.js"

const changeAvailablity = async (req,res) => {
    try {
        const {serId} = req.body
        const serData = await serviceModel.findById(serId)
        await serviceModel.findByIdAndUpdate(serId,{available: !serData.available})
        res.json({success:true, message: 'Availability Changed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const serviceList = async (req,res) => {
    try {
        const services = await serviceModel.find({})
        res.json({success:true,services})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {changeAvailablity, serviceList}