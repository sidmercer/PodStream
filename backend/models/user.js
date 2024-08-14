const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required:true,},
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        unique:true,
        required:true,
    },
    podcasts:[
        {
        type : mongoose.Types.ObjectId,  // mongodb  obj id ko store karte jaynege (as we know mongo db me datastore jo hota hai uska obj id milta hai)
        ref:"podcasts",
        },
    ],
    
},
{timestamps:true}
);
//after creating schema
module.exports = mongoose.model("user",user);  // schema ready