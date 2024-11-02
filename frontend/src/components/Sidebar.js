import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import AllOtherUser from './AllOtherUser.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import {UserApi} from '../content/content.js'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUser, setSelectedUser } from '../redux/userSlice.js';
import { setMessages } from '../redux/messageSlice.js';



const Sidebar = () => {
  const [search , setSearch] = useState('');
  const {otherUser} = useSelector(store=>store.user)
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
       const res = await axios.get(`${UserApi}/logout`)
       if(res.data.success){
        toast.success(res.data.message)
        
        dispatch(setAuthUser(null));
        dispatch(setMessages(null));
        dispatch(setOtherUser(null));
        dispatch(setSelectedUser(null));
        navigate('/signin')
       }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const searchTheUser = (e)=>{
      e.preventDefault();
      const findUser = otherUser?.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()))
      if(findUser){
        dispatch(setOtherUser([findUser]))
      }else{
        toast.error("User not found...")
      }
  }

  return (
    <div className='border-r border-slate-500  p-4 flex flex-col'>
      <form onSubmit={searchTheUser} action="" className='flex items-center gap-2'>
        <input type="text"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          className='input input-bordered rounded-md'
          placeholder='search the user'
        />
        <button type='submit' className='btn'>
          <FaSearch size="20px" className='outine-none' />
        </button>
      </form>
      <div className='divider px-3'></div>
      <AllOtherUser />
      <div>
        <button onClick={handleLogOut} className='btn btn-sm mt-4'>
          Logout
        </button>
      </div>

    </div>
  )
}

export default Sidebar
