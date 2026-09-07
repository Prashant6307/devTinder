import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constant"

const Login = () => {

    const [emailId, setEmailId] = useState("stark@gmail.com")
    const [password, setPassword] = useState("Tony@123")

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            },{
                withCredentials: true
            })
            dispatch(addUser(res.data))
            navigate("/")
            
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col sm:w-96">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
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
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
