import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    gender: {type:String, default:"Not Selected"},
    birthday: {type:String, default:"Not Selected"},
    phone: {type:String, default:"0000000000"}
    })


const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel