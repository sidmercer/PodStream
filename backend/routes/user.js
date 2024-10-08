const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/authMiddleware");
//Sign up route
router.post("/sign-up",async (req,res) => 
{
    try{
        const {username , email, password} = req.body;  // frontend se user jo bheja vo hum lenge
        if(!username || !email || !password)
        {
            return res.status(400).json({ message: "All fields are required"});
        }
        if(username.length < 5 ){
            return res.status(400).json({message : "Username must have 5 characters "}) 
        }
        if(password.length < 6 ){
            return res.status(400).json({message : "Password must have 6 characters "}) 
        }

        //check user exist or not
        const existingEmail = await User.findOne({email: email});
        const existingUsername = await User.findOne({username: username});
        if(existingEmail || existingUsername)
        {
            return res.status(400).json({message: "Username or Email already exists "});
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        const newUser = new User({username,email, password : hashedPass});
        await newUser.save();
        return res.status(200).json({message :"Account created"})

    }catch(error){
        res.status(500).json({error});
    }
});

//Sign-in route
router.post("/sign-in",async (req,res) =>
{
    try{
        const {email,password} = req.body;
        if(!email || !password)
            {
                return res.status(400).json({ message: "All fields are required"});
            }
           //check user exists
            const existingUser = await User.findOne({email: email});
           
            if(!existingUser )
            {
                return res.status(400).json({message: "Invalid credentials "});
            }

            //check password is matches /asame or not
            const isMatch = await bcrypt.compare(password,existingUser.password)
            if(!isMatch )
                {
                    return res.status(400).json({message: "Invalid credentials "});
                }

            //generate JWT Token  
            const token = jwt.sign({id:existingUser._id,email:existingUser.email}
                ,process.env.JWT_SECRET 
                , { expiresIn: "30d"});

            res.cookie("podcasterUserToken",token,{
                httpOnly:true,
                maxAge : 30 * 24 * 60 * 60 * 100, //30 DAYS
                secure: process.env.NODE_ENV === "production"
            });

            return res.status(200).json({
                id:existingUser._id,
                username : existingUser.username,
                email : email,
                message : "Sign-in successfully"
            });
    }
    catch(error){
        res.status(500).json({ error });
    }
});

//logout functionality 
router.post("/logout",async(req,res) => {
    res.clearCookie("podcasterUserToken",{
        httpOnly:true,
    });
    res.status(200).json({message: "Logged out"});
});

// Check cookie  is presnet / available or not 
router.get("/check-cookie",async(req,res) => {
    const token = req.cookies.podcasterUserToken;
    if(token){
        res.status(200).json({message: true });
    }
    res.status(200).json({message: false });
});

//route to fetch user details
router.get("/user-details",authMiddleware, async (req,res) => {
   try {
    const {email} = req.user;
    const existingUser = await User.findOne({email:email}).select(
        "-password"
    );
    return res.status(200).json({user:existingUser});
   } catch (error) {
    console.log(error);
    res.status(500).json({error:error});
   } 
});

module.exports = router;