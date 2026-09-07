import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

function Body() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.user)


  const fetchUser = async () => {

    try {
      if (!userData) {
        return
      }
      const res = await axios.get(BASE_URL + "/profile/view",{
        withCredentials : true
      })

      dispatch(addUser(res.data))
    } catch (err) {
      if (err.status === 401) {
        navigate("/login")
      }
      console.log(err.message)
    }
  }

  useEffect(() => {

    fetchUser()


  }, [])
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
