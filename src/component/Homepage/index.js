// import Peer from 'peerjs'
// import { useEffect, useRef, useState } from 'react'
import BoxchatContainer from './BoxchatContainer'
import Navbar from './Navbar'
import { HomepageContainer } from './styled.ts'
const Homepage = ()=>{

  

    return(
        <HomepageContainer>
            <Navbar></Navbar>
            <BoxchatContainer></BoxchatContainer>
        </HomepageContainer>
    )
}
export default Homepage