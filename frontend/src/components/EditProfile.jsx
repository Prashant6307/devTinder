import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age || "")
    const [gender, setGender] = useState(user.gender || "")
    const [about, setAbout] = useState(user.about || "")
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch()

    const saveProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, photoUrl, age, gender, about }, { withCredentials: true })

            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
        } catch (err) {
            setError(err.response.data)
        }
    }
    return (
        <>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully</span>
                </div>
            </div>}
            <div className="flex justify-center gap-20 my-10">
                <div className=" bg-base-200 ">
                    <div className="hero-content flex-col sm:w-96 bg-base-300">
                        <div className="text-center ">
                            <h1 className="text-5xl font-bold">Edit Profile</h1>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <fieldset className="fieldset">
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
                                    <label className="label">Photo Url</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Photo Url"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                    <label className="label">Age</label>
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="Age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                    <label className="label">Gender</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="label">About</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="About"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                    <p className="text-red-500">{error}</p>
                                    <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save Profile</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />


            </div>
        </>
    )
}

export default EditProfile
