import {ManageAccountsOutlined,EditOutlined,LocationOnOutlined,WorkOutlineOutlined} from '@mui/icons-material'
import {Box,Typography,Divider,useTheme} from '@mui/material'
import UserImage from 'components/UserImage'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'
import { useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import baseURL from 'baseURL'
import { toast } from 'react-toastify'
import UserLoader from 'components/UserLoader'


const UserWidget=({userId,picturePath})=>{
      
      const [user,setUser]=useState(null);
      const [loader,setLoader]=useState(true);
      const {palette}=useTheme();
      const navigate=useNavigate();
      const {token,mode}=useSelector((state)=>state);
      const dark=palette.neutral.dark;
      const medium=palette.neutral.medium;
      const main=palette.neutral.main;

      const getUser=async()=>{
        
           let response=await fetch(`${baseURL}/users/${userId}`,{headers:{'authorization':token}});
           response=await response.json();

           if(response.success){
                 setLoader(false);
                 return setUser(response.message)
           }

           toast.error(response.message,{theme:mode});
      }

      useEffect(()=>{
          getUser();
      },[])


      return(
           <>
            {
             loader?
              <UserLoader/>
              :
                <WidgetWrapper>
                    <FlexBetween gap="0.5rem" pb="1.1rem" onClick={()=>navigate(`/profile/${userId}`)}>

                       <FlexBetween gap="1rem"> 
                          <UserImage image={picturePath.url}/>
                          <Box>
                             <Typography variant="h4" color={dark} fontWeight="500" sx={{"&:hover":{color:palette.primary.light,cursor:"pointer"}}}>{user.firstName} {user.lastName}</Typography>
                             <Typography color={medium}>{user.friends.length} friends</Typography>
                          </Box>
                       </FlexBetween>
                       <ManageAccountsOutlined/>
                       </FlexBetween>
                       <Divider/>

                       <Box p="1rem 0">
                          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                             <LocationOnOutlined fontSize="large" sx={{color:main}}/>
                             <Typography color={medium}>{user.location}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap="1rem">
                             <WorkOutlineOutlined fontSize="large" sx={{color:main}}/>
                             <Typography color={medium}>{user.occupation}</Typography>
                          </Box>
                       </Box>
                       <Divider/>
                      <Box p="1rem 0">

                         <FlexBetween mb="0.5rem">
                             <Typography color={medium}>Who's viewed your profile</Typography>
                             <Typography color={medium} fontWeight="500">{user.viewedProfile}</Typography>
                         </FlexBetween>

                         <FlexBetween>
                             <Typography color={medium}>Impressions of your post</Typography>
                             <Typography color={medium} fontWeight="500">{user.impressions}</Typography>
                         </FlexBetween>

                      </Box>
                      <Divider/>
                      <Box p="1rem 0">

                        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">Social Profiles</Typography>
                        <FlexBetween gap="1rem" mb="0.5rem">
                            <FlexBetween gap="1rem">
                                <img src="./assets/twitter.png" alt="twitter logo" />
                                <Box>
                                  <Typography color={main}>Twitter</Typography>
                                  <Typography color={main}>Social Network</Typography>
                                </Box>
                            </FlexBetween>
                            <EditOutlined sx={{color:main}} />
                        </FlexBetween>

                        <FlexBetween gap="1rem">
                            <FlexBetween gap="1rem">
                                <img src="./assets/linkedin.png" alt="linkedin logo" />
                                <Box>
                                  <Typography color={main}>Linkedn</Typography>
                                  <Typography color={main}>Network Platform</Typography>
                                </Box>
                            </FlexBetween>
                            <EditOutlined sx={{color:main}} />
                        </FlexBetween>
                        

                      </Box>
                </WidgetWrapper>
            }
           </>
      )

}

export default UserWidget
