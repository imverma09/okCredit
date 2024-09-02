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
app.use(
    cors({
        origin: "*",
    })
);
app.get("/", (req, res) => {
  res.status(200).json(data)
})

const port = 4000
app.listen(port , () => {
    console.log("Server Start port no is " + port)
})