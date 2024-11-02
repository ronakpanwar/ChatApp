import React, { useEffect } from 'react'
import SendMessage from './SendMessage'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const Messagebox = () => {

  const { selectedUser , authUser} = useSelector(store => store.user)
  const dispatch = useDispatch();


  return (
    <>
      {
        selectedUser !== null ? (
          <div className='sm:min-w-[550px] flex flex-col'>
          <div className='flex  items-center px-4 py-2 mb-4 gap-2 cursor-pointer bg-zinc-900 '>
            <div className='avatar '>
              <div className=' w-14 rounded-full'>
                <img src={selectedUser?.profileImg} />
              </div>
            </div>
            <div className=''>
              <div className='text-lg text-white '>
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendMessage />
        </div>):(
          <div className='sm:min-w-[550px] flex flex-col items-center justify-center text-white font-bold'>
          <h1 className='text-3xl'>Hi , {authUser?.fullName}</h1>
          <h1 className='text-xl'>Let start conversation...</h1>
          </div>
          
        )
    }

    </>

  )
}

export default Messagebox
