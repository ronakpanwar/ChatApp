import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async(req,res)=>{
    try {
        const senderId = req.id;
        const reciverId = req.params.id;
        const {message} = req.body;
        let gotConversation = await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        })
        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,reciverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            reciverId,
            message
        })
        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }
        await gotConversation.save();
        
        return res.status(200).json({
            success:true,
            message:"Mesage send successfully..."
        })

    } catch (error) {
       res.status(500).json({success:false , message:"Internal server error..."})
        console.log(error)
    }
}

export const getMessages = async (req,res)=>{
    try {

        const senderId = req.id;
        const reciverId = req.params.id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        }).populate("messages")

        return res.status(200).json({
            success:true,
            conversation
        })
        
    } catch (error) {
         res.status(500).json({success:false , message:"Internal server error..."})
        console.log(error)
    }
}