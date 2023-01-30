import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import baseURL from "baseURL";
import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";



const ProfilePage=()=>{

    const [user,setUser]=useState(null);
    const {userId}=useParams();
    const [refresh,setRefresh]=useState(false);
    const loggedInUserId = useSelector((state)=>state.user)
    const theme=useSelector((state)=>state.mode);
    const token=useSelector((state)=>state.token);
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");

    const getUser = async()=>{
          
          let API = await fetch(`${baseURL}/users/${userId}`,{headers:{"Authorization":token}});
          API = await API.json();

          if(API.success) { return setUser(API.message) }

          toast.error(API.message,{theme})

    }

    useEffect(()=>{ getUser(); setRefresh(!refresh) },[userId])

    if(!user) { return null }

    return(
        <Box>
          <Navbar/>

            <Box width="100%" padding="2rem 6%" display={isNonMobileScreens?"flex":'block'} gap="2rem" justifyContent='center'>
              <Box flexBasis={isNonMobileScreens?'26%':undefined}>
                <UserWidget userId={userId} picturePath={user.picturePath}/>
                <Box m="2rem 0"/>
                <FriendListWidget userId={userId}/>
              </Box>

              <Box flexBasis={isNonMobileScreens?'42%':undefined} mt={isNonMobileScreens?undefined:"2rem"}>
                { userId==loggedInUserId._id && <MyPostWidget picturePath={user.picturePath}/> }
                <Box m="2rem 0"/>
                <PostsWidget userId={userId} isProfile/>
              </Box>

        
            </Box>
        </Box>

    )
}

export default ProfilePage