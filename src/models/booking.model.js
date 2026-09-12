import mongoose from "mongoose";
const schema=new mongoose.Schema({clientName:{type:String,required:true},clientEmail:{type:String,required:true},date:{type:String,required:true},time:{type:String,required:true},status:{type:String,required:true},services:[{service:{type:mongoose.Schema.Types.ObjectId,ref:"Service"},quantity:{type:Number,default:1}}]});
export const BookingModel=mongoose.model("Booking",schema);
