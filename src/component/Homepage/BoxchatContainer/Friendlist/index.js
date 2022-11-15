import { useState } from "react"
import { useConversationContext } from "../../../Context/conversationContext"
import { usePeerContext } from "../../../Context/peerContext"
import { useUserInfoContext } from "../../../Context/userInfoContext"
import SingleUserComponent from "./SingleUser"

const FriendList = ()=>{
    const {onlineFriendList} = useUserInfoContext()
    const [userListToCreateConversation, updateUserListToCreateConversation] = useState([])

    const {updateUserInNewConversation} = usePeerContext()
    const {updateMessageObjArray, updateConnectionObjArray} = useConversationContext()
    
    
    const chooseThisUser = (element,index,isChosen)=>{
        console.log(isChosen)
        if (isChosen === false){
            const pos = userListToCreateConversation.map(e => e.name).indexOf(element.name);
            const tempArr = [...userListToCreateConversation]
            tempArr.splice(pos,1);
            updateUserListToCreateConversation(tempArr)

        }
        else{
            const tempArr = [...userListToCreateConversation]
            tempArr.push(element)
            updateUserListToCreateConversation(tempArr)
        }
    }

    const createConversationWithUser = ()=>{
        console.log(userListToCreateConversation)
        updateUserInNewConversation(userListToCreateConversation)
        updateMessageObjArray([])
        updateConnectionObjArray([])
    }



    const onlineFriendListComponent = onlineFriendList.map((element, index) =>{ 
        return(
           <SingleUserComponent key={index} element={element} index={index} chooseThisUser={chooseThisUser}/>
        )
    })
    return(
        <div style={{marginLeft : "30px", marginRight : "30px"}}>
            <div onClick={createConversationWithUser}>Start conversation</div>
            <div>Friend list</div>
            <div>
                {onlineFriendListComponent}
            </div>
        </div>
    )

}
export default FriendList