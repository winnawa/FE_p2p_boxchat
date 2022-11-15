import { useEffect } from "react"
import Boxchat from "./Boxchat"
import FriendList from "./Friendlist"
import { DisplayFlex } from "./styled.ts"
import axios from "axios"
import { useUserInfoContext } from "../../Context/userInfoContext"


const BoxchatContainer = ()=>{
    const{userId} = useUserInfoContext()

    const updateStatus = async ()=>{
        //idValue instead of hardcode id

        await axios.post("https://networkserverasm1.herokuapp.com/updateUserStatus",{
            id : userId,
            status : "online"
        })
        //console.log(response)
        
    }

    useEffect(() => {
        //console.log("hello from update status")
        updateStatus()
    },[userId]);

    return(
        <DisplayFlex>
            <FriendList></FriendList>
            <Boxchat></Boxchat>
        </DisplayFlex>
    )
}
export default BoxchatContainer