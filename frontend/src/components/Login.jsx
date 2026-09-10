import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constant"

const Login = () => {

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, {
                withCredentials: true
            })
            console.log("LOGIN RESPONSE:", res.data)
            dispatch(addUser(res.data))
            navigate("/")

        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong")
            console.log(err.message)
        }
    }

    const handleSignup = async () => {

        try {
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true })

            dispatch(addUser(res.data))
            navigate("/profile")
        } catch (err) {
            console.log(err.response?.data)
            setError(err.response?.data?.message || err.response?.data || "Signup failed")

        }

    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col sm:w-96">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold">{isLoginForm ? "Login now!" : "Sign-Up"}</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            {!isLoginForm && <>
                                <label className="label">First Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <label className="label">Last Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </>}
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="Email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div>
                                <a className="link link-hover">Forgot password?</a>
                            </div>

                            {error && <p className="text-red-500"> {error}</p>}

                            <p className="cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}> {isLoginForm ? "New here: Sign-up" : "Existing account: Login "}</p>

                            <button
                                className="btn btn-neutral mt-4 cursor-pointer"
                                onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Signup"}
                            </button>

                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
