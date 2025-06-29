const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://artisingh3106:vuNzvZ3ZVtdHa1e7@namastenode.eqipsrl.mongodb.net/DevTinder"
    );
};

module.exports = connectDB;

// connectDB() 
//     .then(() => {
//         console.log("established")
//     })
//     .catch((err) => {
//         console.log("not connected");
//     });