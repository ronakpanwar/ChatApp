import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"user",
  initialState:{
      authUser:null,
      loading:false
  },
    reducers:{
      setAuthUser :(state, action)=>{
        state.authUser = action.payload
      },
      setLoading :(state, action)=>{
        state.loading = action.payload
      }
    }
})

export const {setLoading , setAuthUser} = userSlice.actions;
export default userSlice.reducer;