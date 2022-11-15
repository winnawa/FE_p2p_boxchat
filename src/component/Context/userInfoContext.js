import { createContext, useContext, useState } from "react"
import { useEffect } from 'react'
import axios from 'axios'

const tempFunctionForNum =()=>{}
const UserInfoContext = createContext({
                                        userId : '',
                                        updateUserId :  tempFunctionForNum,
                                        onlineFriendList : [],
                                        updateOnlineFriendList: tempFunctionForNum
                                    })

export const useUserInfoContext = ()=>useContext(UserInfoContext)

const UserInfoContextComponent = (props)=>{
    const [userId, updateUserId] = useState('')
    const [onlineFriendList,updateOnlineFriendList] = useState([])
    

    const updateUserFriendListCall = async()=>{
        if (userId !== ''){ 
            const friendList = await axios.post("https://networkserverasm1.herokuapp.com/getFriendList",{
            //id : '636bd36af147091ef0260113'
                id : userId
            })
        //console.log(friendList)
            const onlineFriendList = friendList.data.filter((element)=>{return (element.status === "online")})

            updateOnlineFriendList(onlineFriendList)
        }
    }

    useEffect(() => {
        //console.log("hello")
        let timeFunc = setInterval(updateUserFriendListCall, 5000);
        return ()=>{
            clearInterval(
                timeFunc
            )
        }
    },[userId]);
    
    return(
        <UserInfoContext.Provider value={{userId, updateUserId, onlineFriendList, updateOnlineFriendList}}>
            {props.children}  
        </UserInfoContext.Provider>
    )

    // return(
    // //     <UserInfoContext.Provider value={{userId, updateUserId, onlineFriendList, updateOnlineFriendList}}>
    //          {children}  
    // //     </UserInfoContext.Provider>
    // )



}
export default UserInfoContextComponent