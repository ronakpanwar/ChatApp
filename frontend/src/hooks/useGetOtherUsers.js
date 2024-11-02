import React, { useEffect } from 'react'
import axios from 'axios';
import {UserApi} from '../content/content'
import { useDispatch } from 'react-redux';
import { setOtherUser } from '../redux/userSlice';

const useGetOtherUsers = () => {
    const dispatch = useDispatch(); 
    useEffect(()=>{
        const fetchAllUsers = async()=>{
            try {
                const res = await axios.get(`${UserApi}/other-user`,{
                    withCredentials:true
                });
                if(res.data.success){
                   dispatch(setOtherUser(res.data.allOtherUser))
                }
              } catch (error) {
                console.log(error)
              }
        }
        fetchAllUsers();
     
    },[])
}

export default useGetOtherUsers
