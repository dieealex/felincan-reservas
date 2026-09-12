import mongoose from "mongoose";
const schema=new mongoose.Schema({user:String,message:String},{timestamps:true});
export const MessageModel=mongoose.model("Message",schema);
