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
      const [isImage,setIsImage]=useState(false);
      const [image,setImage]=useState(null);
      const [post,setPost]=useState("");
      const {palette}=useTheme();
      const {_id}=useSelector((state)=>state.user);
      const token=useSelector((state)=>state.token);
      const theme=useSelector((state)=>state.mode);
      const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
      const mediumMain=palette.neutral.mediumMain;
      const medium=palette.neutral.medium

      const handlePost = async () =>{
        
            const formData= new FormData();
            formData.append("description",post);

            if(image){
                formData.append("picture",image)
            }

            let response = await fetch(`${baseURL}/posts`,{headers:{'Authorization':`Bearer ${token}`},body:formData}); 
            response = await response.json();

            if(response.success){
                  dispatch(setPosts(response.message));
                  setImage(null);
                  return toast.success("Picture Uploaded!",{theme})
            }

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
                   <Dropzone accept={{'image/jpeg':[],'image/png':[],'image/jpg':[]}} multiple={false}  onDrop={(acceptedFiles)=>setImage("picture",acceptedFiles[0])}>

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
              </FlexBetween>

          </WidgetWrapper>
      )

}

export default MyPostWidget