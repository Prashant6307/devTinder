const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is not valid " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: " + value);
            }
        },
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: {
            values:["male", "female", "others"],
            message:'{VALUE} is not a valid gender type'
        }

        // validate(value) {
        //     if (!["male", "female", "other"].includes(value)) {
        //         throw new Error("Gender data is not valid")
        //     }
        // }
    },
    photoUrl: {
        type: String,
        default: "https://img.magnific.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
    },
    about: {
        type: String,
        default: "this is the default about section"
    },
    skills: {
        type: [String]
    }
}, { timestamps: true })

userSchema.methods.getJWT = async function () {
    const user = this

    const token = await jwt.sign({ _id: user._id }, "DEV@TINDER$1234", { expiresIn: "7d" })

    return token

}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this
    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)

    return isPasswordValid
}


const userModel = mongoose.model("User", userSchema)

module.exports = userModel