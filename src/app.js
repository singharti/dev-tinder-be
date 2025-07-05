const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validation");
const connectDB = require ("./config/database");
const cookieParser = require ("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const User =  require("./models/user");
const { userAuth } = require("./middlewares/auth");

    app.use(express.json());
    app.use(cookieParser());

    app.post("/signup", async (req,res) => {
        console.log("here");
       
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
        
            // const user = new User(user);
            await user.save();
            res.send("User add sucessfully");
        }catch(err){
            res.status(400).send("Error : " + err.message);
        }
        
    });

    app.post("/login", async (req, res) => {

        try{
            const {emailId, password} = req.body;
            const user = await User.findOne({ emailId : emailId });

            if(!user){
                throw new Error("InValid credentials");
            }
            const isPsswordValid = await user.validatePassword(password)

            if(isPsswordValid){
                console.log("heree");
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

    app.get("/profile", userAuth ,async (req, res) => {
    try{
    
    const user =req.user;
    if(user){
        res.send(user);
    }else{
        throw new Error("User not Valid");
        
    }

        }catch(err){
        res.status(400).send("Error : " + err.message);
    }
    

    });

    app.post("/sendConnectionRequest", userAuth , async (req, res) => {

    const user = req.user;

    res.send(user.firstName + " sent the connect request")
    
    });
 

connectDB() 
    .then(() => {
        console.log("established");
        app.listen(3000, () => {
            console.log("serve");
        });
    })
    .catch((err) => {
        console.log("not connected");
    });