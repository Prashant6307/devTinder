const express = require("express")
const { validateSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const userModel = require("../models/user")
const validator = require("validator")
const jwt = require("jsonwebtoken")



const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
    try {
        // validating user data
        validateSignUpData(req)

        // encrypting password
        const { firstName, lastName, emailId, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)

        const userdata = new userModel({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })


        await userdata.save()
        res.status(200).send("user data saved successfully")
    } catch (err) {

        res.status(400).send("user data cannot be saved " + err)
    }
})

authRouter.post("/login", async (req, res) => {

    try {
        // checking emailId entered by the user before logging 
        const { emailId, password } = req.body
        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid credentials")
        }

        // check if user email exists in the DB
        const user = await userModel.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid credentials")
        }

        // comparing user password with passwordHash
        const isPasswordValid = await user.validatePassword(password)

        if (isPasswordValid) {

            // creating jwt token
            const token = await user.getJWT()


            res.cookie("token", token, { expiresIn: new Date(Date.now + 8 * 3600000) })
            res.send("Login successful")
        }
        else {
            throw new Error("Invalid credentials")
        }

    } catch (err) {
        res.status(400).send("Error " + err.message)
    }
})

module.exports = authRouter