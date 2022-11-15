import axios from "axios";
import { useState } from "react";

const Authentication = (props)=>{

    const [account,updateAccount]= useState('');
    const [password, updatePassword] = useState('');

    const onAccountChangeHandler = (e)=>{
        e.preventDefault();
        updateAccount(e.currentTarget.value)
    }
    const onPasswordChangeHandler = (e)=>{
        e.preventDefault();
        updatePassword(e.currentTarget.value)
    }

    const submitLogin = async()=>{
        const response = await axios.post('https://networkserverasm1.herokuapp.com/login',{
            account : account,
            password : password
        })
        if (response.data){
            props.updateUserId(response.data.id)
            //console.log(response.data.id)
        }
        //console.log(response)
    }

    return(
        <div> 
            <div>
                <input type='text' value={account} onChange={onAccountChangeHandler}></input>
                <input type='text' value={password} onChange={onPasswordChangeHandler}></input>
            </div>
            <button type='submit' onClick={()=>{submitLogin()}}></button>
            
        </div>
    )
}

export default Authentication
