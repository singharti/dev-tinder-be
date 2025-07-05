const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation")

profileRouter.get("/profile/view", userAuth ,async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    
    try{

        if(!validateProfileData(req)){
            throw new Error("Invalid edit Request");
            
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        console.log(loggedInUser);
        res.json({mesage:"Profile Update successfully", data : loggedInUser});

    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});

// profileRouter.patch("/profile/password", userAuth, async (req, res) => {
//     // Validation of data
//     const { oldPassword, newPassword } = await ChangePasswordSchema.validate(req.body {
//         abortEarly: false,
//         stripUnknown: true
//     });

//     // Get logged in user's data
//     const loggedInUser = req.user;

//     // Validation of password
//     const isValidPassword = await loggedInUser.validatePassword(oldPassword);
//     if (!isValidPassword) {
//         throw new ErrorHandler("Invalid Credentials", 401);
//     }

//     // Update the user password
//     loggedInUser.password = newPassword;

//     // Save the data
//     await loggedInUser.save({ validateBeforeSave: false });

//     // Return the response
//     res.status(200).json({
//         success: true,
//         message: "Updated password successfully"
//     });
// });

module.exports = profileRouter ;
