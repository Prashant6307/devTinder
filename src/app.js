const express = require("express")
const connectDB = require("./config/database")
const dotenv = require("dotenv")
const userModel = require("./models/user")

dotenv.config()

const app = express()

app.use(express.json())

app.post("/signup", async (req, res) => {
    const userdata = new userModel(req.body)

    try {
        await userdata.save()
        res.status(200).send("user data saved successfully")
    } catch (err) {

        res.status(400).send("user data cannot be saved ", err)
    }
})

app.get("/user", async (req, res) => {
    const username = req.body.firstName

    try {
        const user = await userModel.find({ firstName: username })

        if (user.length === 0) {
            res.status(400).send("user not found")
        } else {
            res.send(username)
        }

    } catch (err) {
        res.send("something went wrong")
    }

})


// Feed 
app.get("/feed", async(req, res)=>{

    try{
        const users = await userModel.find({})

        res.send(users)
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

// Delete a user
app.delete("/user", async (req, res)=>{
    const userId = req.body.userId

    try{
        const user = await userModel.findByIdAndDelete( userId)
        res.status(400).send("User deleted successfully")

    }catch(err){
        res.send("something went wrong, cannot delete the user "+ err.message)
    }
})

// Update the data of the user
app.patch("/user", async (req, res)=>{
    const userId = req.body.userId
    const data = req.body

    try{
        const userUpdatedData = await userModel.findByIdAndUpdate({_id: userId}, data)
        res.status(400).send("User data updated successfully")
    }catch(err){
        res.send("something went wrong cannot update "+ err.message) 
    }
})

connectDB().then(() => {
    console.log("Database connected successfully")

    app.listen(3000, () => {
        console.log("Server listening on port 3000...")

    })
}).catch((err) => {
    console.error("Database connection failed", err)
})

