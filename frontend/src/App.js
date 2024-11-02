
  
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {io, Socket} from 'socket.io-client'
import { setSocket } from "./redux/socketSlice";
import { setOnlineUser } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signin',
    element:<SignIn/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },

])

function App() {
   
  const {authUser}  = useSelector(store=>store.user)
  const {socket}  = useSelector(store=>store.socket)
  const dispatch = useDispatch();

  useEffect(()=>{
    if (authUser) {
      const newSocket = io('http://localhost:8000',{
        query:{
         userId:authUser?._id
        }

      });
      dispatch(setSocket(newSocket))
      newSocket.on('getOnlineUsers',(onlineUser)=>{
        dispatch(setOnlineUser(onlineUser));
      })
      return ()=> newSocket.close();
    }else{
     if(socket){
      socket.close();
      dispatch(setSocket(null));
     }
    }
  },[authUser])

  return (
    <div className="p-4  h-screen flex items-center justify-center">
       <RouterProvider router={router}/>
    </div>
  );
}

export default App;
