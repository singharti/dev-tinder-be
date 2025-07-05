const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next)=>{
    try{

        //Read the token frm req cookies
        const { token } = req.cookies;

        //validate the token
        if(!token){
            throw new Error("Token not valid !!!!!");
        }
        const decodeObj = await jwt.verify(token, "Dev@Tinder123");

        const { _id } = decodeObj;
        //Find the user
        const user = await User.findById(_id);

        if(!user){
            throw new Error("User not Found");
            
        }
        req.user = user;
        next();

    } catch (err){
        res.status("404").send("ERROR : " + err.message);
    }

};

module.exports = { userAuth };