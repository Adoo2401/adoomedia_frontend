import baseURL from "baseURL";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import PostLoader from "components/PostLoader";


const PostsWidget=({userId,isProfile=false})=>{
    
    const dispatch=useDispatch();
    const posts=useSelector((state)=>state.posts)
    const [loader,setLoader]=useState(true);
    const theme=useSelector((state)=>state.mode);
    const token=useSelector((state)=>state.token);

    const getPosts = async()=>{
          
          let response=await fetch(`${baseURL}/posts`,{headers:{"Authorization":`Bearer ${token}`}});
          response=await response.json();

          if(response.success){ setLoader(false); return dispatch(setPosts(response.message)) }

          toast.error(response.message,{theme})

    }

    const getUserPosts =async()=>{

          let response=await fetch(`${baseURL}/posts/${userId}/posts`,{headers:{"Authorization":`Bearer ${token}`}});
          response=await response.json();

          if(response.success){ setLoader(false); return dispatch(setPosts(response.message)) }

          toast.error(response.message,{theme})
          setLoader(false);
    }

    useEffect(()=>{
        if(isProfile){ return getUserPosts(); }
        getPosts();
    },[])


    return(
        <>
          {loader?<PostLoader/>:posts.map((singlePostData,index)=>(
               <PostWidget singlePostData={singlePostData} key={index}/>
          ))}
        </>
    )

}


export default PostsWidget