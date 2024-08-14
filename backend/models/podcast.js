const mongoose = require("mongoose");

const podcasts = new mongoose.Schema({
    frontImage:{
        type: String,
        unique: true,
        required:true,},
    audioFile:{
        type:String,
        unique:true,
        required:true,
    },
    title:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
        unique:true,
        required:true,
    },
    user:
        {
        type : mongoose.Types.ObjectId,  
        ref:"user",
        },          // ek user ek podcast create kar sakta hai
    category:{
        type : mongoose.Types.ObjectId, // ek podcast ek category ka hoga 
        ref:"category",
    }
    
},
{timestamps:true}
);

module.exports = mongoose.model("user",user);  // schema ready