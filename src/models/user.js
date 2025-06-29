const mongoose = require("mongoose");

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
    },
    about:{
        type : String,
        default : "This is default",

    },
    skills :{
        type :[String]
    }

},{timestamps : true});

const User = mongoose.model("User", userSchema);

module.exports = User;