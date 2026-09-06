import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Body() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Body
