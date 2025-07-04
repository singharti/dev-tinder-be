const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validation");
const connectDB = require ("./config/database");
const app = express();
const User =  require("./models/user");

    app.use(express.json());

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
            const isPsswordValid = await bcrypt.compare(password, user.password)

            if(isPsswordValid){
                res.send("Login Successfully");
            }else{
                throw new Error("InValid credentials");
                
            }
        }catch(err){
            res.status(400).send("Error : " + err.message);
        }
    });

    app.get("/user", async (req,res) => {
        const userEmail = req.body.emailId
        try{
            const user = await User.findOne({emailId : userEmail});
            if(!user){
                res.status(404).send("user not found");
            }
            // if(user.lenth === 0){
            //     res.status(404).send("user not found");
            // }
            res.send(user);

        }catch(err){
            res.status(400).send("Error " + err.message);

        }
    });

    app.get("/feed", async (req,res) => {
        //creating in intance
        try{
             const users = await User.find({});
                res.send(users);
        }catch(err){
            res.status(400).send("Error " + err.message);
        }
        
    });

     app.delete("/user", async (req,res) => {
        //creating in intance
        const userId = req.body.userId;
        try{
             const user = await User.findByIdAndDelete(userId);
             if(!user){
                res.status(404).send("user not found ");

             }else{
                res.send("User Delete sucessfully");

             }
        }catch(err){
            res.status(400).send("Error " + err.message);
        }
        
    });

     app.patch("/user/:userId", async (req,res) => {
        //creating in intance
        const userId = req.params?.userId;
        const data = req.body;
       
        try{
             const ALLOWED_UPDATE = [
            "photoUrl", "about", 'gender', "age","skills"
            ];
            const isUpdatedAllowed = Object.keys(data).every((k) => 
                ALLOWED_UPDATE.includes(k)
            );
            if(!isUpdatedAllowed){
                throw new Error("update not allow");
                
            }
            if(data?.skills.length > 10){
                throw new Error("Skills not nore than 10");
                
            }
              const user = await User.findOneAndUpdate({ _id : userId } , data, {
                returnDocument :'after',
                runValidators : true
              } );
            //  if(!user){
            //     res.status(404).send("user not found ");

            //  }else{
            console.log(user);
                res.send(" User Update sucessfully");

            //  }
        }catch(err){
            res.status(400).send("Error " + err.message);
        }
        
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