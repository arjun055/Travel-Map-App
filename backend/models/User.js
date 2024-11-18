import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
},{timestamps: true})


export default mongoose.model('User',UserSchema);