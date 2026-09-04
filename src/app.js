const express = require("express")
const connectDB = require("./config/database")
const dotenv = require("dotenv")

const cookieParser = require("cookie-parser")


dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.json())



const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


connectDB().then(() => {
    console.log("Database connected successfully")

    app.listen(3000, () => {
        console.log("Server listening on port 3000...")

    })
}).catch((err) => {
    console.error("Database connection failed", err)
})

