import { Skeleton } from '@mui/material'
import React from 'react'

const UserLoader = () => {
  return (
    <>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:'center'}}>
        <Skeleton variant='circular' width="40px" height="40px"/>
        <Skeleton variant='text' width="85%" height="15px"/>
     </div>
     <Skeleton variant='text' width="30%" animation="wave" height="15px" sx={{mt:"20px",mb:'10px'}}/>
     <Skeleton variant='text' width="30%" animation="wave" height="15px"/>
     <Skeleton variant='text' width="100%" height="15px" sx={{mt:"30px",mb:"10px"}}/>
     <Skeleton variant='text' width="100%" height="15px"/>
     <Skeleton variant="rectangular" animation="wave" sx={{mt:'40px'}} height="60px"/>
    </>
  )
}

export default UserLoader