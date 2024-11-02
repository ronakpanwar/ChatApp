import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Messagebox from './Messagebox'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/signin");
    }
  }, []);
  return (
    <div className='flex  sm:h-[450px] md:h-[500px]   rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border-2 '>
     <Sidebar/>
     <Messagebox/>
    </div>
  )
}

export default Home
