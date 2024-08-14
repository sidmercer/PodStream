const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const userApi = require("./routes/user");

require("dotenv").config();
require("./connnections/conn");

app.use(express.json()); //  json is used cux whenever data is passed from frontend to backend and 
                            //backend to frontend data will be in json format.
app.use(cookieParser());
//all routes
app.use("/api/v1",userApi); //  userApi sign up pe jayega

// Check if PORT is defined
app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`);
});
