import React from 'react'
import {EditOutlined,DeleteOutline,AttachFileOutlined,GifBoxOutlined,ImageOutlined,MicOutlined,MoreHorizOutlined} from '@mui/icons-material'
import {Box,Divider,Typography,InputBase,useTheme,Button,IconButton,useMediaQuery} from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Dropzone from 'react-dropzone'
import UserImage from 'components/UserImage'
import WidgetWrapper from 'components/WidgetWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import baseURL from 'baseURL'
import { toast } from 'react-toastify'
import { setPosts } from 'state'


const MyPostWidget = ({picturePath}) => {
  
      const dispatch=useDispatch();
      const [isImage,setIsImage]=useState(true);
      const [image,setImage]=useState(null);
      const [disable,setDisable]=useState(false);
      const [post,setPost]=useState("");
      const {palette}=useTheme();
      const {_id}=useSelector((state)=>state.user);
      const token=useSelector((state)=>state.token);
      const theme=useSelector((state)=>state.mode);
      const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
      const mediumMain=palette.neutral.mediumMain;
      const medium=palette.neutral.medium

      function scrollToBottom() {
        // Get the total height of the page
        var totalHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    
        // Get the current scroll position
        var currentY = window.pageYOffset;
    
        // Calculate the distance to the bottom of the page
        var distance = totalHeight - currentY;
    
        // Scroll the page smoothly using a linear easing function
        var currentTime = 0;
        var time = Math.max(0.1, Math.min(distance / 2000, 0.8));
    
        // Animation
        var animate = function() {
            currentTime += 1 / 60;
            var p = currentTime / time;
            var t = Math.pow(p - 1, 3) + 1;
    
            if (p < 1) {
                requestAnimationFrame(animate);
                window.scrollTo(0, currentY + (distance * t));
            } else {
                window.scrollTo(0, totalHeight);
            }
        };
        animate();
    }

  
      const handlePost = async () =>{

            if(post==='' && !image) return toast.error("Post cannot be empty",{theme})

            setDisable(true);
            
            const formData= new FormData();
            formData.append("description",post);

            if(image){
                formData.append("picture",image)
            }

            let response = await fetch(`${baseURL}/posts`,{headers:{'Authorization':`Bearer ${token}`},body:formData,method:"POST"}); 
            response = await response.json();
            
            if(response.success){
                  dispatch(setPosts(response.message));
                  setImage(null);
                  setDisable(false);
                  scrollToBottom();
                  return toast.success("Post Uploaded!",{theme})
            }

            setDisable(false);
            toast.error(response.message,{theme})

      }

      return(
          <WidgetWrapper>

              <FlexBetween gap="1.5rem">

                  <UserImage image={picturePath.url}/>
                  <InputBase placeholder="What's on your mind..." onChange={(e)=>setPost(e.target.value)} value={post} sx={{width:"100%",backgroundColor:palette.neutral.light,borderRadius:'2rem',padding:'1rem 2rem'}}/>

              </FlexBetween>
              
              {isImage && (
                <Box borderRadius='5px' border={`1px solid ${medium}`} mt="1rem" p='1rem'>
                   <Dropzone accept={{'image/jpeg':[],'image/png':[],'image/jpg':[]}} multiple={false}  onDrop={(acceptedFiles)=>setImage(acceptedFiles[0])}>

                      {({getRootProps,getInputProps})=>(
                         <FlexBetween>
                          <Box width="100%" {...getRootProps()} border={`1px dashed ${palette.primary.main}`} p="1rem" sx={{"&:hover":{cursor:"pointer"}}}>
                             <input {...getInputProps()}/>
                             {!image?(
                              <p>Add Image Here</p>
                             ):(
                               <FlexBetween>
                                   <Typography>{image.name}</Typography>
                                   <EditOutlined/>
                               </FlexBetween>
                             )
                             }
                          </Box>
                          {image && (
                            <IconButton onClick={()=>setImage(null)} sx={{width:"15%"}}>
                               <DeleteOutline/>
                            </IconButton>
                          )}
                        </FlexBetween>
                      )}
                        
                    </Dropzone>
                </Box>
              )}

              <Divider sx={{margin:"1.25rem 0"}} />

              <FlexBetween>

                  <FlexBetween gap="0.25rem" onClick={()=>setIsImage(!isImage)}>
                     <ImageOutlined sx={{color:mediumMain}}/>
                     <Typography color={mediumMain} sx={{"&:hover":{cursor:"pointer",color:medium}}}>Image</Typography>
                  </FlexBetween>

                  {isNonMobileScreens?(
                      <>

                       <FlexBetween gap="0.25rem">
                          <GifBoxOutlined sx={{color:mediumMain}}/>
                          <Typography color={mediumMain}>Clip</Typography>
                       </FlexBetween>

                       <FlexBetween gap="0.25rem">
                          <AttachFileOutlined sx={{color:mediumMain}}/>
                          <Typography color={mediumMain}>Attachment</Typography>
                       </FlexBetween>

                       <FlexBetween gap="0.25rem">
                          <MicOutlined sx={{color:mediumMain}}/>
                          <Typography color={mediumMain}>Audio</Typography>
                       </FlexBetween>

                      </>
                  ):(
                      <>
                       <FlexBetween gap="0.25rem">
                          <MoreHorizOutlined sx={{color:mediumMain}}/>
                       </FlexBetween>
                      </>
                  )}

                  <Button disabled={disable} onClick={handlePost} sx={{color:palette.background.alt,backgroundColor:palette.primary.main,borderRadius:"3rem",cursor:"pointer"}}>POST</Button>

              </FlexBetween>

          </WidgetWrapper>
      )

}

export default MyPostWidget