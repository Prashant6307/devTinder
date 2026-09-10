import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequest } from "../utils/requestsSlice"

const Requests = () => {
    const requests = useSelector(store => store.requests)
    const dispatch = useDispatch()
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/requests/received", { withCredentials: true })
            dispatch(addRequest(res.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])


    if (!requests) return <h1>No Requests Found</h1>

    if (requests.length === 0) {
        return <h1>No Requests Found</h1>
    }

    return (
        <div className="text-center my-10">
            <h1>Requests</h1>

            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = request.fromUserId
                return <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto">
                    <div>
                        <img src={photoUrl} alt="photo" className="w-20 h-20" />
                    </div>
                    <div className="text-left mx-4">
                        <h2>{firstName + " " + lastName}</h2>
                        <p>{about}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary">Reject</button>
                        <button className="btn btn-secondary">Accept</button>
                    </div>

                </div>
            })}

        </div>
    )
}

export default Requests
