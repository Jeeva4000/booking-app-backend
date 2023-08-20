import express from "express"
import {updateUser,deleteUser,getUser,getUsers} from "../controllers/user.js "
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router=express.Router();

//check authentication for user 
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello user,you are logged in")
// })

//check the user or not for id 
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello user,you are logged in and you can delete your account")
// })

//is admin check the user or not
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello admin,you are logged in and you can delete all accounts")
// })



//update
router.put("/:id",verifyUser, updateUser)

//delete
router.delete("/:id",verifyUser, deleteUser)

//get
router.get("/:id",verifyUser, getUser)

//getall
router.get("/",verifyAdmin, getUsers)


export default router;