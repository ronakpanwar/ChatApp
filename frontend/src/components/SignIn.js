import React, { useState } from 'react'
import axios from 'axios'
import { UserApi } from '../content/content';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setLoading } from '../redux/userSlice';


const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading }  = useSelector(store=>store.user);
  const [formData, setFormData] = useState({
    username: '',
    password: '',

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${UserApi}/login`, formData, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setAuthUser(res.data.userData))
        
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
     // Form submission
  };

  return (
    <div className='min-w-96 m-auto'>
      <div className=" w-full px-10    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 rounded-md  border-white">
        <h1 className='font-bold text-black text-center mt-4 text-3xl'>Signin</h1>

        <form action="" onSubmit={handleSubmit} className=''>

          <div className="form-control mb-1">
            <label className="label text-black  label-text">Username</label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full border-gray-300 focus:ring-0 text-sm py-1 h-10"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label text-black  label-text">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full border-gray-300 focus:ring-0 text-sm py-1 h-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {
            loading ? <button
              type="submit"
              className="w-full py-2 mt-2 mb-1 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 rounded-md text-sm">
              <span className="loading loading-spinner loading-sm"></span>

            </button> : <button
              type="submit"
              className="w-full py-2 mt-2 mb-1 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 rounded-md text-sm">
              Signin

            </button>
          }

          <div className='mt-1 mb-2'>
            <a href="/signup" className='text-center text-white hover:underline font-bold'>
              <h3>Create a new account </h3>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn
