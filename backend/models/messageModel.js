import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
      required:true,
        ref:"User"
    },
    reciverId:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
        ref:"User"
    },
    message:{
        type:String,
         required:true
    }
},{timestamps:true})

export const Message = mongoose.model("Message" , messageSchema);