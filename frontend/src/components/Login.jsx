import axios from "axios"
import { useState } from "react"

const Login = () => {

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")


    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/login", {
                emailId,
                password
            })
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
