//import Peer from 'peerjs'
import { useEffect, useRef, useState } from 'react'
import { useConversationContext } from '../../../Context/conversationContext';
import { usePeerContext } from '../../../Context/peerContext';
import { useUserInfoContext } from '../../../Context/userInfoContext';

const Boxchat = ()=>{
    const [message, updateMessage] = useState('') //for message writting
    const onMessageChangeHandler = (e)=>{
        e.preventDefault();
        updateMessage(e.currentTarget.value)
    }
    
    
    //const peerInstance = useRef(null)
    //const connection = useRef(null)

    const {userId, peerInstance, peerInstanceState} = useUserInfoContext();
    const {peerId,userInNewConversation} = usePeerContext();
    const {messageObjArray,connectionObjArray, addNewMessageObj,addNewConnectionObj} = useConversationContext();

    
    const sendMessage = (connection, messageObj)=>{
        // conn.on('open', function(){
            // here you have conn.id
            
            //connection.current.send(message);
            connection.send(messageObj)
            addNewMessageObj(messageObj)
        //})
    }
    
    const connectionEstablishment = (id)=>{
        //connection.current = peerInstance.current.connect(id);
        // on open will be launch when you successfully connect to PeerServer

        const newConnection = peerInstanceState.connect(id)
        addNewConnectionObj(newConnection)

        // conn.on('open', function(){
        //     // here you have conn.id
        //     conn.send('hi!');
        //}
        //);
    }

    const connectToAllPeerInList = () => {
        //console.log('userInNewConversation',userInNewConversation)
        console.log('peerInstance',peerInstanceState)
    
        for (let element of userInNewConversation){
            connectionEstablishment(element.status)
            console.log(element.status)
        }
    }
    const sendMessageToAllPeerInList = ({message})=>{
        //console.log("inhere")
        for (let i=0; i< connectionObjArray.length; i++){
            sendMessage(connectionObjArray[i],{message: message, idInPeerJS : userInNewConversation[i].peerId, name : userInNewConversation[i].name})
            console.log('sendding to', userInNewConversation[i].peerId)
        }
    }

    
    useEffect(()=>{
        console.log(userId)
        if (userId !== '') {
            console.log('in here')
            connectToAllPeerInList()
        }
    },[userId,userInNewConversation,peerInstanceState])



    const messageDisplayed = messageObjArray.map((element,index)=>{
        return(
            <div key={index} style={{postion:"absolute",left:"0px"}}>
                <div>{element.name}</div>
                <div>{element.message}</div>
            </div>
        )
    })


    return(
        <div style={{height:"500px", position:"relative"}}>
            <div>{peerId}</div>
            <div style={{height:"300px", position:"relative", overflow:"hidden"}}>
            {messageDisplayed}
            </div>
            <div style={{bottom:'0px', position:'absolute'}}>
                <input type='text' value={message} onChange={onMessageChangeHandler}></input>
                <button type='submit' onClick={()=>{sendMessageToAllPeerInList(message)}}></button>
            </div>
        </div>
    )
}
export default Boxchat