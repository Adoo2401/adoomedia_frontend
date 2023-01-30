import {Box,Typography,useTheme} from '@mui/material'
import baseURL from 'baseURL'
import Friend from 'components/Friend'
import FriendLoader from 'components/FriendLoader'
import WidgetWrapper from 'components/WidgetWrapper'
import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {setFriends} from 'state'


const FriendListWidget=({userId})=>{

    const {palette} = useTheme();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true)
    const {_id} = useSelector((state)=>state.user)
    const token=useSelector((state)=>state.token);
    const friends=useSelector((state)=>state.user.friends);
    const theme=useSelector((state)=>state.mode);

    const getFriends = async()=>{
        
          let API = await fetch(`${baseURL}/users/${userId}/friends`,{headers:{"Authorization":token}});
          API = await API.json();

          if (API.success) { setLoader(false); return dispatch(setFriends({friends:API.message})) }
          
          setLoader(false); 
          toast.error(API.message,{theme})

    }

    useEffect(()=>{getFriends();},[])

    return(
        <>
        {loader?<FriendLoader/>:<WidgetWrapper>

          <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{mb:'1.5rem'}}>Friend List</Typography>
          
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends.map((friend,index)=>(
               <Friend key={index} friendId={friend._id} name={`${friend.firstName} ${friend.lastName}`} subtitle={friend.occupation} userPicturePath={friend.picturePath.url} />
            ))}
          </Box>
          
          </WidgetWrapper>}
        </>
    )

}

export default FriendListWidget