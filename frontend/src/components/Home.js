import React from 'react'
import Sidebar from './Sidebar'
import Messagebox from './Messagebox'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border-2 '>
     <Sidebar/>
     <Messagebox/>
    </div>
  )
}

export default Home
