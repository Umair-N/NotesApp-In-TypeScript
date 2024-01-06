import mongoose from "mongoose";
import "dotenv/config"
import { config } from "dotenv";
config({path : "./config.env"})

const connectToMongo = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE!)
        console.log("DATABASE CONNECTED...")
    } catch (error) {
        console.log("Database not connected")
    }
}
export default connectToMongo