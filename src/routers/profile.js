const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth ,async (req, res) => {
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

module.exports = profileRouter ;
