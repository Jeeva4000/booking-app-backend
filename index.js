import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"



const app =express();
dotenv.config()


const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongodb successfully")
} catch (error) {
    console.log("error")
}
};

//middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)





app.listen(8800,()=>{
    connect()
    console.log("server running in localhost:8800")
})