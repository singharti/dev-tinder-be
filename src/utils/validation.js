const validator  = require("validator");

const validateSignupData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName|| !lastName){
        throw new Error("Name is not Valid!");

    } else if ( !validator.isEmail(emailId)){
        throw new Error("Email is not Valid!");

    }
    else if ( !validator.isStrongPassword(password)){
        throw new Error("password is not Valid!");

    }

  
};

const  validateProfileData =(req) => {
    const allowedEditFields = [
        'firstName', 
        'lastNmae', 
        'age',
        'gender',
        'about',
        'skills',
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditFields.includes(field)
    );

    return isEditAllowed;

}

module.exports = {
    validateSignupData,
    validateProfileData
}