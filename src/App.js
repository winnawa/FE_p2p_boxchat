
import Authentication from "./component/Authentication";
import { useUserInfoContext } from "./component/Context/userInfoContext";
import Homepage from "./component/Homepage";


function App() {
  
  const {userId, updateUserId}= useUserInfoContext()

  if (userId === ''){
    return(
      <Authentication updateUserId={(newId)=>{updateUserId(newId); 
        //console.log(userId)
      }}/>
    )
  }
  else  {
    return (
      <Homepage/>
    )
  }
}

export default App;
