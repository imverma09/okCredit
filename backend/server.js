const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require('mongoose')
const singUpRouter = require('./router/signUp')
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials : true,
  })
);
app.use(express.json())

app.use('/registration' , singUpRouter)

mongoose.connect('mongodb://localhost:27017/myBank')
.then(()=>{
  const port = 4000;
  app.listen(port, () => {
    console.log("Server Start port no is " + port)
  })
})
.catch(err =>{
  console.log(err)
})