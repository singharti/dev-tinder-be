const express = require("express");
const connectDB = require ("./config/database");
const app = express();

const User =  require("./models/user");

    app.post("/signup", async (req,res) => {
        const userObj ={
            firstName : "Ankit",
            lastName: "Singh",
            emailId : "artisingh@gmail.com",
            password: "xyz",
            age: 25
        }

        //creating in intance
        try{
            const user = new User(userObj);
            await user.save();
            res.send("User add sucessfully");
        }catch(err){
            res.status(400).send("Error" + err.message);
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