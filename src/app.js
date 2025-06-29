const express = require("express");
const connectDB = require ("./config/database");
const app = express();
const User =  require("./models/user");

    app.use(express.json());

    app.post("/signup", async (req,res) => {
        const user  =  new User(req.body);
        console.log(user);

        //creating in intance
        try{
            // const user = new User(user);
            await user.save();
            res.send("User add sucessfully");
        }catch(err){
            res.status(400).send("Error " + err.message);
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

     app.patch("/user", async (req,res) => {
        //creating in intance
        const userId = req.body.userId;
        console.log(userId);
        const data = req.body;
        try{
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