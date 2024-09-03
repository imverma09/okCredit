const express = require("express")
const cors = require("cors")
const app = express()

const data = [
      {
        userName : "Harsh",
        totalAmount : 0
      },
      {
        userName : "John Wick",
        totalAmount : 0
      },
      {
        userName : "Daniel",
        totalAmount : 0
      },
]
 const userData = []
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json())

app.post("/" , (req ,res)=>{
    const val =  req.body
    data.id = Math.random()
    data.push(val)
    res.status(202).json(data)
})

app.get("/", (req, res) => {
  res.status(200).json(data)
})

app.post("/registration/singUp",(req ,res) =>{
  const val = req.body ; 
  userData.push(val)
  res.status(202).json(userData)
})
const port = 4000
app.listen(port , () => {
    console.log("Server Start port no is " + port)
})