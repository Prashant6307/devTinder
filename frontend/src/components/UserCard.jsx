import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


const UserCard = ({ user }) => {
    const { _id, firstName, lastName, age, gender, photoUrl, about } = user
    const dispatch = useDispatch()

    const handleSendRequest = async (status, _id) =>{
        try {
            await axios.post(BASE_URL +  "/request/send/"+ status + "/" + _id, {}, {withCredentials: true})

            dispatch(removeUserFromFeed(_id))
        } catch (err) {
            console.log(err.message);
            
        }
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm p-2">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender} </p>}
                {about &&<p> {about} </p>}
                <div className="card-actions justify-between">
                    <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
