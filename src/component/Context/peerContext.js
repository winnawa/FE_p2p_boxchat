import { createContext, useContext } from "react"
import Peer from 'peerjs'
import { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { useUserInfoContext } from "./userInfoContext"
import { useConversationContext } from "./conversationContext"

const tempFunctionForNum =()=>{}
const PeerContext = createContext({
                                        peerId : '',
                                        updatePeerId :  tempFunctionForNum,
                                        peerInstance : {},
                                        userInNewConversation : [],
                                        updateUserInNewConversation : tempFunctionForNum,
                                        peerInstanceState : {}
                                    })
export const usePeerContext = ()=>useContext(PeerContext)


const PeerContextComponent = (props)=>{
    const [peerId, updatePeerId] = useState('')
    const [userInNewConversation, updateUserInNewConversation] = useState([])
    //const [idOfFriend, updateIdOfFriend] = useState('')
    const peerInstance = useRef(null)
    const [peerInstanceState, updatePeerInstanceState] = useState({})



    const {userId} = useUserInfoContext()
    const {addNewMessageObj} = useConversationContext()


    const updatePeerIdAddressToServer = async(peerId)=>{
        const response = await axios.post("https://networkserverasm1.herokuapp.com/updateUserAddress",{
            id : userId,
            address : peerId
        })
        console.log('userId',userId)
    }

    useEffect(()=>{
        if (userId !== ''){
        const peer = new Peer()
        peer.on('open', (id) =>{
            //console.log(id)
            updatePeerId(id)
            if (id !== ''){
                updatePeerIdAddressToServer(id); 
                      
                //console.log('update peerId')
            }
        })


        //peerInstance.current = peer;
        //console.log("peer instance",peerInstance.current)
        updatePeerInstanceState(peer);
        console.log("peer instance",peer)
        
        
        peer.on('connection', function(conn) {
            conn.on('data', function(data){
                // Will print 'hi!'
                console.log(data);
                addNewMessageObj({message: data.message, idInPeerJS : data.peerId, name : data.name})
                //messageFromOtherside.push(data)
            });
        });
        }
        //updatePeerInstanceState(peerInstance.current)
    },[userId])

    return(
        <PeerContext.Provider value={{peerId, updatePeerId, peerInstance: peerInstance.current, userInNewConversation, updateUserInNewConversation, peerInstanceState}}>
            {props.children}
        </PeerContext.Provider>
    )
}
export default PeerContextComponent