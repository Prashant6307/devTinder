import { useState } from "react"
import UserCard from "./UserCard"

const EditProfile = ({user}) => {
    
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl)
    const [age, setAge] = useState(user?.age)
    const [gender, setGender] = useState(user?.gender)
    const [about, setAbout] = useState(user?.about)
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col sm:w-96">
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
                            {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                            {/* {error && <p className="text-red-500"> {error}</p>} */}
                            <button className="btn btn-neutral mt-4" >Save Profile</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}/>
    </div>
  )
}

export default EditProfile
