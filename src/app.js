const express = require("express");

const app = express();


const { adminAuth , userAuth } = require("./middlewares/auth");

app.use('/admin', adminAuth);



//route handler
app.get("/admin/getData", 
    (req, res,next) =>{
    res.send("Hello from the serve!")
});
app.get("/user", userAuth ,
    (req, res,next) =>{
    // res.send("Hello from the reponse 1!")
    next();
});


app.listen(3000, () => {
    console.log("serve");
});