const adminAuth = (req,res, next)=>{
    const token ="xyz";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized){
        res.status(402).send("UnAuhorized");
    }else{
        next();
    }

};

const userAuth = (req,res, next)=>{
    const token ="xyz";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized){
        res.status(402).send("UnAuhorized");
    }else{
        next();
    }

};

module.exports = { adminAuth , userAuth };