const mongoose =  require('mongoose')
const subSchema = mongoose.Schema({
    totalAmount : {
        type : Number,
        default : 0 , 
    } ,
    userName : {
        type :String , 
        required : true , 
        unique: true ,
    },
})

const historySchema = mongoose.Schema({
    frdName : mongoose.Types.ObjectId,
    amount  : Number,
    date : {
        type : Date ,
        default : Date.now() 
    }
})

const friend =  mongoose.Schema({
    userID : mongoose.Types.ObjectId,
    friend : [subSchema], 
    history : [historySchema]
    
})

module.exports =mongoose.model('friend' , friend)