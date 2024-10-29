import React from 'react'
import { FaSearch } from "react-icons/fa";
import OtherUser from './OtherUser';


const Sidebar = () => {
  return (
    <div className='border-r border-slate-500  p-4 flex flex-col'>
      <form action="" className='flex items-center gap-2'>
        <input type="text" 
        name="" 
        className='input input-bordered rounded-md'
        placeholder='search the user'
        />
        <button  type='submit' className='btn'>
        <FaSearch size="20px" className='outine-none'/>
        </button>
      </form>
      <div className='divider px-3'></div>
      <OtherUser/>
    </div>
  )
}

export default Sidebar
