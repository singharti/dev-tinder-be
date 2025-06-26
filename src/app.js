const express = require("express");

const app = express();

app.use("/", (req, res) =>{
    res.send("Hello from the serve!")
});

app.use("/hello", (req, res) =>{
    res.send("Hello hello!")
});

app.listen(3000, () => {
    console.log("serve");
});