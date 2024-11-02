import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from 'axios'
import {MessageApi} from '../content/content'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { setMessages } from '../redux/messageSlice';

const SendMessage = () => {
    const {selectedUser} = useSelector(store=>store.user)
    const {messages} = useSelector(store=>store.message)
    const dispatch = useDispatch();
     const [message , setMessage] = useState();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`${MessageApi}/send/${selectedUser?._id}`,{message} ,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true,
            })
         
            dispatch(setMessages([...messages ,res?.data?.newMessage]))  
            
        } catch (error) {
            console.log(error)
        }
        setMessage('')

    }
    return (  
        <form className='px-2 my-4 ' onSubmit={handleSubmit} >
            <div className='w-full relative'>
                <input type="text"
                
                onChange={(e)=>{
                  setMessage(e.target.value)
                }}
                value={message}
                    placeholder='send a message ...'
                    className='w-full px-4 py-3 text-sm rounded-lg bg-slate-600 border-zinc-800 block '
                />
                <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form> 
    )
}

export default SendMessage
