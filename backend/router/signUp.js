const express = require('express')
const router = express.Router()
const users = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'qp2903-iki00*&*(w&^@IUD8E6Y^%$*9T'
router.post("/singUp", async (req, res) => {
  const val = req.body;
  try {
    const salt = await bcrypt.genSalt()
    const newPassword = await bcrypt.hash(val.password, salt)
    val.password = newPassword;
    const newUser = await users.create(val)
    const token =  await jwt.sign({ _id : newUser._id }, secret)
    res.cookie('jwt', token, {
      httpOnly : true,
      maxAge: 60 * 60 * 1000
    })
    return res.status(202).json({ messages: "wellCome" })
  }
  catch (error) {
    if (error.code == 11000) {
      return res.status(401).json({ error: 'email must be unique' })
    }
    res.status(500).json({ error: error.message.split(':')[2] })
  }
})

router.post("/singIn", async (req, res) => {
  const val = req.body;
  try {
    const find = await users.findOne({ email: val.email })
    if (!find) {
      return res.status(401).json({ msg: "email or password not match" })
    }
    const exist = bcrypt.compare(find.password, val.password)
    if (!exist) {
      return res.status(401).json({ msg: "email or password not match" })
    }
   const token =  await jwt.sign({_id : find._id} , secret)
   res.cookie('jwt', token , {
    httpOnly : true ,
    maxAge :  60*60*1000,
   })
    res.status(202).json({ msg: "welcome back " })
  }
  catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router;