const express = require("express")
const cors = require("cors")
const app = express()

const data = [
  {
    userName: "Harsh",
    totalAmount: 0
  },
  {
    userName: "John Wick",
    totalAmount: 0
  },
  {
    userName: "Daniel",
    totalAmount: 0
  },
]
const userData = []
const amountList = [
 
]
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json())
app.post("/", (req, res) => {
  const val = req.body
  data.id = Math.random()
  data.push(val)
  res.status(202).json(data)
})

app.get("/", (req, res) => {
  res.status(200).json(data)
})

app.post("/registration/singUp", (req, res) => {
  const val = req.body;
  const exists = userData.some(user => user.email.toLowerCase() == val.email.toLowerCase())
  if (exists) {
    res.status(400).json({ error: "Email All Ready Exists " })
  }
  res.status(202).json({ messages: "wellCome" })
  userData.push(val)
})
app.post("/registration/singIn", (req, res) => {
  const val = req.body
  const loginUser = userData.filter(u => u.email === val.email)
  if (loginUser.length == 0) {
    res.status(404).json({ error: "email not  exists!!!" })
  } else {
    if (loginUser[0].password != val.password) {
      res.status(404).json({ error: "email or password wrong !!!" })
    }else{
      res.status(202).json({messages : " login Successfully"})
    }
  }
})
const port = 4000
app.listen(port, () => {
  console.log("Server Start port no is " + port)
})

// person file data handle

app.get("/person/:num" , (req ,res)=>{
     const name = req.params.num
     const filterName  =  data.filter((user) => user.userName == name)
     if (filterName.length >= 0) {
       res.status(202).json(filterName)
      }
      res.status(404).json({error : "user not found"})
})

app.post("/person/:num" ,(req,res)=>{
      const  name = req.params.num
      const data = req.body
      amountList.forEach((list)=>{
          if (list.name==name) {
            amountList.push({name , transaction : [{...data}]})
          }
        })
        amountList.push({name , transaction : [{...data}]})
      console.log(amountList[0].transaction)
      // res.status(202).json(amountList)
})