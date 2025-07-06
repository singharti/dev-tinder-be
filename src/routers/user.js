const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName age skill";

userRouter.get('/user/requests/received' , userAuth , async(req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : 'interested'
        }).populate("fromUserId",USER_SAFE_DATA);

        res.json({data: connectionRequest, message : "Requested Llist"});


    } catch(err){
        res.status(500).send({message : " ERRROR : " + err.message});
    }
    

});

userRouter.get("/user/connections" , userAuth, async (req, res) => {

    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or :[
                { toUserId : loggedInUser._id ,status:"accepted" },
                { fromUserId : loggedInUser._id ,status:"accepted" },


            ],
        }).populate('fromUserId', USER_SAFE_DATA )
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({mesage:"conenction list", data: data});
        
    } catch(err){
        res.status(500).send({message : " ERRROR : " + err.message});
    }
});


module.exports = userRouter;
