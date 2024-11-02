import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'



const AllOtherUser = () => {

  useGetOtherUsers();
  const {otherUser} = useSelector(store=>store.user)
//   console.log(otherUser)
  if(!otherUser) return;
    return (
        <>
            <div className='overflow-auto'>
            {
                otherUser?.map((user)=>{
                    return (
                        <OtherUser key={user._id} user={user} />
                    )     
                })
            }
               
            

            </div>
        </>
    )
}

export default AllOtherUser
