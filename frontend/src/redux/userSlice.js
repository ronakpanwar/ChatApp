import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"user",
  initialState:{
      authUser:null,
      loading:false,
      otherUser:[],
      selectedUser:null,
      onlineUser:null
  },
    reducers:{
      setAuthUser :(state, action)=>{
        state.authUser = action.payload
      },
      setLoading :(state, action)=>{
        state.loading = action.payload
      },
      setOtherUser:(state,action)=>{
        state.otherUser = action.payload
      },
      setSelectedUser:(state,action)=>{
        state.selectedUser = action.payload
      },
      setOnlineUser:(state,action)=>{
        state.onlineUser = action.payload
      }
    }
})

export const {setLoading , setAuthUser, setOtherUser, setSelectedUser , setOnlineUser} = userSlice.actions;
export default userSlice.reducer;