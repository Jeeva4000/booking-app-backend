import mongoose from "mongoose";
const {Schema} = mongoose;


const RoomSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
       
      
    },
   maxPeople:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[{number:Number, unavailableDates:[{type:[Date]}]}],
    
    isAdmin:{
        type:Boolean,
       default:false
    },
},{timestamps:true})


export default mongoose.model("Room",RoomSchema)