import { User } from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    try {
        const {fullName, username , password , gender,phoneNo } = req.body;
        if(!fullName || !username || !password || !gender || !phoneNo){
          return  res.status(400).json({success:false , message:"Somthing missing ..."});
        }
        const userN = await User.findOne({username})
        if(userN){
            return  res.status(400).json({success:false , message:"Username already exists.."});
          }

        const user = await User.findOne({phoneNo});
        if(user){
          return  res.status(400).json({success:false , message:"User alreday exsist.."});
        }
       
        const hashPassword = await bcryptjs.hash(password , 10);

    const maleImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
        fullName,
        username,
        password:hashPassword,
        profileImg:gender==="male"?maleImg:femaleImg,
        phoneNo,
        gender
    })

    return res.status(201).json({success:true , message:"You Succesfully Create Your Account..."})

    } catch (error) {
        res.status(500).json({success:false , message:"Internal Server error"})
        console.log(error);
    }
}

export const login = async (req,res)=>{
    try {
        const { username , password  } = req.body;
        if( !username || !password ){
          return  res.status(400).json({success:false , message:"Somthing missing..."});
        }

        const user = await User.findOne({username})
        if(!user){
            return  res.status(400).json({success:false , message:"User name is not match..."});
        }

        const isPasswordMatch = await bcryptjs.compare(password , user.password);
        if(!isPasswordMatch){
            return  res.status(400).json({success:false , message:"Password is incorrect..."});
        }
        
       const  userData = {
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profileImg:user.profileImg,
            phoneNo:user.phoneNo
        }

        const tokenData = {
           userId:user._id
        }

        const token =  jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn:'1d'});

        return  res.status(200).cookie('token',token,{maxAge:1*24*60*60*1000, httpOnly:true}).json({
            success:true ,
            message:`Welcome back ${user.fullName}`,
            userData
            });

         
    } catch (error) {
        res.status(500).json({success:false , message:"Internal Server error"})
        console.log(error);
    }
}

export const logOut = (req,res)=>{
      try {
        return res.status(200).cookie("token", "" ,{maxAge:0}).json({
            success:true,
            message:"Logged Out Successfully..."
        })
      } catch (error) {
        res.status(500).json({success:false , message:"Internal Server error"})
        console.log(error);
      }
}


export const getAllOtherUser = async(req,res)=>{
    try {
        const logInId = req.id;
        const allOtherUser = await User.find({_id:{$ne:logInId}}).select("-password");
        return res.status(200).json({
            success:true,
            allOtherUser
        })
        
    } catch (error) {
        res.status(500).json({success:false , message:"Internal Server error"})
        console.log(error);
    }
}