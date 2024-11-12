import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {type:String, required:true},
    type: {type:String, required:true},
    about: {type:String, required:true},
    available: {type:Boolean, default:true},
    fees: {type:Number, required:true},
    date: {type:Number, required:true},
    slots_booked: {type:Object, default:{}}
}, {minimize:false})


const serviceModel = mongoose.models.service || mongoose.model('service',serviceSchema)

export default serviceModel