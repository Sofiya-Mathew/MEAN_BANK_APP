//Database  integration
//server-mongodb connection

//import mongoose

const mongoose=require('mongoose')

//state connection string via mongoose

mongoose.connect('mongodb://127.0.0.1:27017/BankServer',{
    useNewUrlParser:true , //to avoid warnings
})

//define bank database model
.then(()=>{console.log('mongodb connected')})
.catch(err=>{console.log('failed to connect mongodb',err)})

const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}