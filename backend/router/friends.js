const express = require('express')
const router = express.Router()
const friend = require('../model/friends')

router.get('/:id', async (req, res) => {
  const userID = req.params.id
  try {
    const data = await friend.findOne({ userID }, { history: 0 })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})

router.post('/addPerson/:userId', async (req, res) => {
  const bodyData = req.body
  const userId = req.params.userId
  try {
    await friend.updateOne({ userID: userId }, { $push: { friend: { userName: bodyData.userName } } }, { upsert: true })
    const data = await friend.findOne({ userID: userId }, { history: 0 });
    res.status(200).json(data)
  }
  catch (err) {
    console.log(err)
  }

})
//  PERSON FILE CODE  
router.get('/person/:userID/:name', async (req, res) => {
  const { userID, name } = req.params
  try {
    const data = await friend.findOne({ userID, 'friend.userName': name }, { 'friend.$': 1 })
    const frdHistory = await friend.findOne({ userID }, { friend: 0 });
    let findHistory = [];
    frdHistory.history.forEach(element => {
      if (String(element.friendID) == String(data.friend[0]._id)) {
        findHistory = [...findHistory, element]
      }
    });
    res.status(200).json({ data, findHistory })
  } catch (error) {
    console.log(error.message)
    res.status(501).json({ err: " something wrong ...!" })
  }
})

router.post('/person/:userID/:personId/:type', async (req, res) => {
  const { userID, personId, type } = req.params;
  const amount = req.body.amount
  try {
    await friend.updateOne({ userID, 'friend._id': personId }, { $inc: { 'friend.$.totalAmount': type == "given" ? Number(amount) : - Number(amount) }, $push: { history: { amount: type == "given" ? Number(amount) : - Number(amount), friendID: personId } } })
    const frdHistory = await friend.findOne({ userID, 'friend._id' : personId}, {'friend.$' : 1 , history : 1} )
    // console.log(frdHistory)
     let findHistory = []  ;

    frdHistory.history.forEach(element => {
       if (String(element.friendID) ==  personId) {
         findHistory =[...findHistory, element]
       }
    });

    res.status(200).json({findHistory, frd :  frdHistory.friend });
  } catch (error) {
    console.log(error.message)
  }
})
module.exports = router