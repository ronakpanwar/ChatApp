import axios from 'axios'
import React, { useEffect } from 'react'
import { MessageApi } from '../content/content'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setMessages } from '../redux/messageSlice'

const useGetMessages = () => {
    
    const {selectedUser} = useSelector(store=>store.user)
    const dispatch = useDispatch();
   

   useEffect(()=>{
      const fetchMessages = async()=>{
        try {
            const res = await axios.get(`${MessageApi}/${selectedUser?._id}`, {
                withCredentials:true
            })
            console.log(res)
           dispatch(setMessages(res.data))
            
            
        } catch (error) {
            console.log(error)
        }
      }
      fetchMessages();
   },[selectedUser])
}

export default useGetMessages
