 //server creation
//import express
 const express=require('express')

 //create app using express
 const app=express()

 app.use(express.json())

 const dataService= require('./service/data.service')
 const jwt=require('jsonwebtoken')

 const cors=require('cors')

//give command to share data via cors

app.use(cors({
  origin:'http://localhost:4200'
}))

//create port number

 app.listen(3000,()=>{
    console.log('server listening on port 3000');
 })


 //resolving http requests
 //GET method
 app.get('/',(req,res)=>{
    res.send('get method')
 })

//router specific middleware
const jwtMiddleware=(req,res,next)=>{
  try {
    const token=req.headers['x-access-token']
    console.log('router specific middleware');
    const data=jwt.verify(token,'key2022')
    console.log(data);
    next()
  
  } catch{
    res.status(422).json({
      statusCode:422,
      status:false,
      message:"please login first"
    })
  }
}

 //post method

 //put method
//  app.put('/',(req,res)=>{
//    res.send('put method')
//  })

//  //delete method

//  app.delete('/',(req,res)=>{
//    res.send('delete method')
//  })

//  //patch method

//  app.patch('/',(req,res)=>{
//    res.send('patch method')
//  })


 app.post('/registration',(req,res)=>{
 dataService.register(req.body.acno,req.body.username,req.body.password)
 .then(result=>{
  res.status(result.statusCode).json(result)
 })
 })

 app.post('/login',(req,res)=>{
 dataService.login(req.body.acno,req.body.pwd)
 .then(result=>{
  res.status(result.statusCode).json(result)
 })
 }) 


 app.post('/deposit',jwtMiddleware,(req,res)=>{
  dataService.deposit(req.body.acno,req.body.pwd,req.body.amount)
  .then(result=>{
    res.status(result.statusCode).json(result)
  })
 }) 

 app.post('/withdraw',jwtMiddleware,(req,res)=>{
dataService.withdraw(req.body.acno,req.body.pwd,req.body.amount)
.then(result=>{
  res.status(result.statusCode).json(result)
})
 }) 

 app.post('/transaction',(req,res)=>{
  dataService.getTransaction(req.body.acno)
  .then(result=>{
    res.status(result.statusCode).json(result)
  })
 })
 
 app.delete('/deleteAcc/:acno',(req,res)=>{
  dataService.deleteAcc(req.params.acno)
  .then(result=>{
    res.status(result.statusCode).json(result)
  })
 })

