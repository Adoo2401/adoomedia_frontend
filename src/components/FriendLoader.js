import { Skeleton } from '@mui/material'
import React from 'react'

const FriendLoader = () => {
  return (
    <div>
       <div style={{display:"flex",justifyContent:"space-around",marginTop:"10px"}}>
         <Skeleton animation="wave" variant='circular' width="40px" height="40px"/>
         <div style={{display:"flex",flexDirection:"column",width:"80%"}}>
            <Skeleton animation="wave" variant="text" width="50%" height="20px"/>
            <Skeleton animation="wave" variant="text" width="40%" height="10px" style={{marginTop:"4px"}}/>
         </div>
       </div>
       <div style={{display:"flex",justifyContent:"space-around",marginTop:"30px"}}>
         <Skeleton animation="wave" variant='circular' width="40px" height="40px"/>
         <div style={{display:"flex",flexDirection:"column",width:"80%"}}>
            <Skeleton animation="wave" variant="text" width="50%" height="20px"/>
            <Skeleton animation="wave" variant="text" width="40%" height="10px" style={{marginTop:"4px"}}/>
         </div>
       </div>
       <div style={{display:"flex",justifyContent:"space-around",marginTop:"30px"}}>
         <Skeleton animation="wave" variant='circular' width="40px" height="40px"/>
         <div style={{display:"flex",flexDirection:"column",width:"80%"}}>
            <Skeleton animation="wave" variant="text" width="50%" height="20px"/>
            <Skeleton animation="wave" variant="text" width="40%" height="10px" style={{marginTop:"4px"}}/>
         </div>
       </div>
    </div>
  )
}

export default FriendLoader