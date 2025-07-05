const express = require("express");

const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User =  require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req,res) => {
    
    try{
            //validation of data
        validateSignupData(req);

        const {password, firstName, lastName,emailId } = req.body;
                
        //Encrypt the password

        const passwordHash = await bcrypt.hash(password, 10);
        //creating in intance
        const user  =  new User({
            firstName,
            lastName,
            emailId, 
            password :passwordHash}
        );
    
        await user.save();
        res.send("User add sucessfully");
    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
    
});

authRouter.post("/login", async (req, res) => {

    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({ emailId : emailId });

        if(!user){
            throw new Error("InValid credentials");
        }
        const isPsswordValid = await user.validatePassword(password)

        if(isPsswordValid){
            const token = await user.getJWT();

            res.cookie("token",token,  { 
                expires: new Date(Date.now() + 8 * 3600000) 
            });
            res.send("Login Successfully");
        }else{
            throw new Error("InValid credentials");
        }
    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {

    res.cookie("token",null,  { 
        expires: new Date(Date.now()) 
    }).send("Logout");
      
});


module.exports = authRouter ;