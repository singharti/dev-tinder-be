const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName age skills about photoUrl";
const User = require("../models/user");


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

userRouter.get("/feed", userAuth, async(req, res) =>{
    try{
        //user should see all the user card excepr
        // 0. her own card
        // 1. her connections
        // 2. ignore people
        // 3. already sent the connection request
        const loggedInUser = req.user;

        const page = parseInt(req.query.page)  || 1;
        const limit = parseInt(req.query.page)  || 5;
        const skip = (page -1 ) * limit ;

         const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

        res.json({data : users});

    } catch(err){
        res.status(500).send({message : " ERRROR : " + err.message});
    }
});


module.exports = userRouter;
