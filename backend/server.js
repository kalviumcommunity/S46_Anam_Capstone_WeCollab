require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch(err) {
        console.error(err)
        process.exit(1)
    }
    console.log("connected")
}

connectDB()

app.get("/",(req,res) => {
    res.send("Welcome to WeCollab")
})

app.listen(process.env.PORT,() => {
    console.log(`server running at ${process.env.PORT}`)
})