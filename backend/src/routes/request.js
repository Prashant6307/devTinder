const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest")
const userModel = require("../models/user")


const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["ignored", "interested"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).send("Invalid status type " + status)
        }

        const toUser = await userModel.findById(toUserId)
        if (!toUser) {
            return res.status(400).send({ message: "User not found" })
        }

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if (existingConnectionRequest) {
            return res.status(400).send({ message: "Connection request already exists" })
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save()

        return res.json({
            message: "Connection request sent successfully",
            data
        })


    } catch (err) {

        res.status(400).send("Error " + err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {

    try {
        const loggedInUser = req.body
        const { status, requestId } = req.params

        const allowedStatus = ["accepted", "rejected"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            })
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: toUserId,
            toUserId: loggedInUser._id,
            status: "interested"

        })
        if (!connectionRequest) {
            return res.status(404).json({
                message: "Connection request not found"
            })
        }

        connectionRequest.status = status

        const data = await connectionRequest.save()

        res.json({
            message: "Connection request " + status, data
        })

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }

})

module.exports = requestRouter