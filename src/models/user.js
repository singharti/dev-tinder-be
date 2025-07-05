const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        require : true,
        minLength : 4,
        maxLength : 50,
        
    },
    lastName: {
        type : String
    },
    emailId: {
        type : String,
        lowerCase : true ,
        require : true,
        unique: true ,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalide Email Id");
                
            }
        }
    },
    password: {
        type : String,
        require : true,
    },
    age: {
        type : Number,
        min :18 ,
    },
    gender: {
        type : String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Gender data is not valid");
                
            }
        }
    },
    photoUrl:{
        type : String,
         validate(value){
            if(!validator.isUrl(value)){
                throw new Error("Invalide Photo ");
                
            }
        }
    },
    about:{
        type : String,
        default : "This is default",

    },
    skills :{
        type :[String]
    }

},{timestamps : true});

userSchema.methods.getJWT = async function () {
    const user = this;
     const token = await jwt.sign({ _id : user._id}, "Dev@Tinder123", {
        expiresIn : '1d'
    });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
     const user = this;
     const passwordHash = user.password;
     const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
     
     return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;