import { Skeleton } from '@mui/material'
import React from 'react'

const PostLoader = () => {
  return (
    <>
    <div style={{marginTop:"40px",display:"flex"}}>
      <Skeleton style={{marginTop:"10px"}} animation='wave' variant='circular' height={'50px'} width="60px"/>
      <div style={{marginLeft:"20px",width:"100%",marginTop:'10px'}}>
         <Skeleton variant="text" animation='wave' width='50%'   />
         <Skeleton animation='wave' variant="text" width='50%' sx={{marginTop:"10px"}}  />
      </div>
    </div>
    <Skeleton variant="text" animation='wave'  sx={{marginTop:"40px"}} />
    <Skeleton height="600px" variant="rectange" animation="wave" sx={{marginTop:"40px"}} />
    </>

  )
}

export default PostLoader