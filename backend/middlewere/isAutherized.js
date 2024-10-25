import jwt from 'jsonwebtoken'

export const isAutherized = async(req,res,next)=>{
    try {

        const token = req.cookies.token;
        if(!token){
          return  res.status(401).json({success:false , message:"User not logIn..."}) 
        }

        const decode =  jwt.verify(token , process.env.SECRET_KEY)
        if(!decode){
           return res.status(401).json({success:false , message:"Cookie is invalid..."}) 
        }

        req.id = decode.userId;
        next();
        
    } catch (error) {
        res.status(500).json({success:false , message:"Internal Server error"})
        console.log(error);
    }
}