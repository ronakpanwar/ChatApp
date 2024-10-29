import React, { useState } from 'react';
import axios from 'axios'
import { UserApi } from '../content/content';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/userSlice';

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store=>store.user)
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        gender: 'male',
        phoneNo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
          const res = await axios.post(`${UserApi}/register` , formData , {
            headers:{
              'Content-Type':"application/json"
            },
            withCredentials:true
          })
          if(res.data.success){
            toast.success(res.data.message)
            navigate('/signin')
          }
        } catch (error) {
           toast.error(error.response.data.message)
          console.log(error)
        }
        finally{
            dispatch(setLoading(false))
        }
        console.log(formData); // Form submission
    };

    return (
        <div className='min-w-96 m-auto'>
            <div className=" w-full px-10    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 rounded-md  border-white">
                <h1 className='font-bold text-black text-center mt-4 text-3xl'>Signup</h1>

                <form action="" onSubmit={handleSubmit} className=''>

                    <div className="form-control mb-1 ">
                        <label className="label text-black  label-text">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="input input-bordered  border-gray-300 focus:ring-0 text-sm h-10 w-full "
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                    <div className="form-control mb-1">
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

                    <div className="form-control mb-1">
                        <label className="label text-black">Gender</label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={() => handleChange({ target: { name: "gender", value: "male" } })}
                                    className="checkbox checkbox-sm text-blue-600 border-gray-300 focus:ring-0 focus:outline-none"
                                />
                                <span className="ml-2 text-sm text-black">Male</span>
                            </label>

                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={() => handleChange({ target: { name: "gender", value: "female" } })}
                                    className="checkbox checkbox-sm text-blue-600 border-gray-300 focus:ring-0 focus:outline-none"
                                />
                                <span className="ml-2 text-sm text-black">Female</span>
                            </label>
                        </div>
                    </div>


                    <div className="form-control mb-1">
                        <label className="label text-black  label-text">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNo"
                            className="input input-bordered w-full border-gray-300 focus:ring-0 text-sm py-1 h-10   "
                            value={formData.phoneNo}
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
                        <a href="/signin" className='text-center text-white hover:underline font-bold'>
                            <h3>Already have account </h3>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
