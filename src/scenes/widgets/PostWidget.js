import React from 'react'
import {ChatBubbleOutlineOutlined,FavoriteBorderOutlined,FavoriteOutlined,ShareOutlined} from '@mui/icons-material'
import {Box,Divider,IconButton,Typography,useTheme} from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Friend from 'components/Friend'
import WidgetWrapper from 'components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setPost } from 'state'
import baseURL from 'baseURL'
import { toast } from 'react-toastify'

const PostWidget = ({singlePostData}) => {


    const {palette} = useTheme();
    const [isComments,setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token=useSelector((state)=>state.token);
    const theme=useSelector((state)=>state.mode);
    const loggedInUserId = useSelector((state)=>state.user._id);
    const isLiked = Boolean(singlePostData.likes[loggedInUserId])               // likes is a map which looks like likes={"userId":true}
    const likeCount = Object.keys(singlePostData.likes).length;

    
    const main=palette.neutral.main;
    const primary=palette.primary.main

    const patchLike = async()=>{

          let response = await fetch(`${baseURL}/posts/${singlePostData._id}/like`,{headers:{"Content-Type":'application/json','Authorization':`Bearer ${token}`},method:"PATCH",body:JSON.stringify({userId:loggedInUserId})})
          response=await response.json(); 

          if (response.success) { return dispatch(setPost(response.message)) }

          toast.error(response.message,{theme})

    }

  return (
    <WidgetWrapper m="2rem 0" >

        <Friend friendId={singlePostData.userId} subtitle={singlePostData.location} userPicturePath={singlePostData.userPicturePath} name={`${singlePostData.firstName} ${singlePostData.lastName}`} />
        <Typography color={main} sx={{mt:"1rem"}}>{singlePostData.description}</Typography>

        {singlePostData.picturePath && (
            <img width="100%" height="auto" alt="post Picture" style={{borderRadius:"0.75rem",marginTop:"0.75rem"}} src={singlePostData.picturePath.url} />
        )}

        <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
               <FlexBetween gap="0.3rem">
                  <IconButton onClick={patchLike}>
                      {isLiked?(<>
                          
                          <FavoriteOutlined sx={{color:primary}}/>

                      </>):(<>
                            
                            <FavoriteBorderOutlined/>

                      </>)}

                  </IconButton>

                <Typography>{likeCount}</Typography>

               </FlexBetween>
               <FlexBetween gap="0.3rem">
                 
                  <IconButton onClick={()=>setIsComments(!isComments)}>
                       <ChatBubbleOutlineOutlined/>
                  </IconButton>

                  <Typography>{singlePostData.comments.length}</Typography>
                 
               </FlexBetween>
            </FlexBetween>

            <IconButton>
                <ShareOutlined/>
            </IconButton>

        </FlexBetween>

        {isComments && (
            <Box mt="0.5rem">
               {singlePostData.comments.map((comment,index)=>(

                  <Box key={index}>
                     <Divider/>
                     <Typography sx={{color:main,m:"0.5rem 0",pl:"1rem"}}>{comment}</Typography>
                  </Box>

               ))}
            </Box>
        )}

    </WidgetWrapper>
  )
}

export default PostWidget