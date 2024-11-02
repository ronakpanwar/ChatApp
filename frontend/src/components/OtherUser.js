import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import useGetMessages from '../hooks/useGetMessages';

const OtherUser = ({user}) => {
    const {selectedUser , onlineUser} = useSelector(store=>store.user);
    const isOnline = onlineUser?.includes(user._id)
   const dispatch  = useDispatch();
    
    const handleSelectedUser = (user)=>{
       dispatch(setSelectedUser(user));
       
    }
   

    return (
        <div className=''>
            <div onClick={()=>{handleSelectedUser(user)}} className={`${selectedUser?._id === user?._id ? 'bg-zinc-300 text-zinc-900':''}  flex py-1 items-center text-white hover:text-zinc-900 gap-2 cursor-pointer hover:bg-zinc-300 rounded-md`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className=' w-14 rounded-full'>
                        <img src={user.profileImg} />
                    </div>
                </div>
                <div className=''>
                    <div className='text-lg  '>
                        <p>{user.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider py-0 my-0 h-1'></div>
        </div>
    )
}

export default OtherUser
