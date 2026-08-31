const express = require("express")
const connectDB = require("./config/database")
const dotenv = require("dotenv")
const userModel = require("./models/user")

dotenv.config()

const app = express()

app.post("/signup", async(req, res)=>{

    const userdata = new userModel({
        firstName: "abc"
    })

    try{
        await userdata.save()
        res.status(200).send("user data saved successfully")
    }catch(err){
        
        res.status(400).send("user data cannot be saved ", err)
    }
})

connectDB().then(() => {
    console.log("Database connected successfully")

    app.listen(3000, () => {
        console.log("Server listening on port 3000...")

    })
}).catch((err) => {
    console.error("Database connection failed",err)
})

