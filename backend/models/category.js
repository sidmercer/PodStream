    const mongoose = require("mongoose");

    const category = new mongoose.Schema({
        categoryName:{
            type: String,
            unique: true,
            required:true,},
        
        podcasts:{                              // ek category ke andar multiple podcasts honge
            type : mongoose.Types.ObjectId, 
            ref:"podcasts",
        },
    
    },
    {timestamps:true}
    );

    module.exports = mongoose.model("category",category);  // schema ready