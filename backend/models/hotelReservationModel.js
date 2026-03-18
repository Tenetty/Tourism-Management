const mongoose=require('mongoose')

const hotelReservationModel=new mongoose.Schema({
    hotelName:{
        type:String,
        required:false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkInDate:{
        type:String,
        required:true
    },
    checkOutDate:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true 
    },
    totalPrice:{
        type:String,
        required:true
    },
    totalDays:{
        type:Number,
        required:true
    }
    
    
   
},{timestamps :true}) 

module.exports =  mongoose.model("hotelReservation",hotelReservationModel)  