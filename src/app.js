const express = require("express");

const app = express();


// const { adminAuth , userAuth } = require("./middlewares/auth");

// app.use('/admin', adminAuth);



//route handler
// app.get("/admin/getData", 
//     (req, res,next) =>{
//     res.send("Hello from the serve!")
// });
app.use("/",(err, req, res, next) => {
    if(err){
        res.status(500).send("error");
    }
})
app.get("/getUserData",
    (req, res,next) =>{
        // try{
        throw new Error("dfdsfsd");

        // }catch(err){
        //     res.status(500).send("contact team")
        // }
        
    res.send("Hello from the reponse 1!")
});
//alwarys write in end
app.use("/",(err, req, res, next) => {
    if(err){
        res.status(500).send("error");
    }
})




app.listen(3000, () => {
    console.log("serve");
});