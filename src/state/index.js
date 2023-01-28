import {createSlice} from '@reduxjs/toolkit'

const initialState={mode:"dark",user:null,token:null,posts:[]}    

export const authSlice=createSlice({
    name:"auth",
    initialState,

    reducers:{

           setMode:(state)=>{
            state.mode=state.mode==='light'?"dark":"light"
           },

           setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
           },

           setLogout:(state)=>{
              state.user=null;
              state.token=null;
           },

           setFriends:(state,action)=>{
                if(state.user){
                     state.user.friends=action.payload.friends
                }else{
                    console.log("user friends not exists");
                }
           },

           setPosts:(state,action)=>{
            state.posts=action.payload
           },

           setPost:(state,action)=>{

                  const updatePosts=state.posts.map((post)=>{
                    if(post._id===action.payload._id) {return action.payload};
                    return post
                  })
                  state.posts=updatePosts
           }

    }
})

export const {setMode,setLogin,setLogout,setFriends,setPost,setPosts} =authSlice.actions
export default authSlice.reducer;