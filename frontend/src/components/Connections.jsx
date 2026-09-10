import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionsSlice"

const Connections = () => {
  const connections = useSelector(store => store.connections)
  const dispatch = useDispatch()

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true
      })
      console.log(res)
      dispatch(addConnections(res.data.data))
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections) return <h1>No Connections Found</h1>

  if (connections.length === 0) {
    return <h1>No Connections Found</h1>
  }

  return (
    <div className="text-center my-10">
      <h1>Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection
        return <div key={_id} className="m-4 p-4 rounded-lg bg-base-200">
          <div>
            <img src={photoUrl} alt="photo" className="w-20 h-20" />
          </div>
          <div className="text-left mx-4">
            <h2>{firstName + " " + lastName}</h2>
            <p>{about}</p>
          </div>

        </div>
      })}

    </div>
  )
}

export default Connections
