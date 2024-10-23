import React, { useContext, useRef, useState , useEffect } from 'react'
import {Link, useParams } from 'react-router-dom'
import { userContext } from '../context/UserContextProvider'
function Person() {
  const params = useParams()
  const { name } = params
  const [amount, setAmount] = useState("")
  const [filterUser, setFilterUser] = useState([])
  const [amountList, setAmountList] = useState([])
  // const day = new Date()
  // const time = day.toLocaleTimeString("en-US")
 useEffect(()=>{
  const userId = localStorage.getItem('id')
  fetch(`http://localhost:4000/person/${userId}/${name}`)
  .then(res => res.json())
  .then(data => {
    setFilterUser(data.data.friend)
    setAmountList(data.findHistory)
  })
  .catch(err => console.log(err))
 },[]) 
  const containerRef = useRef()
  
  function amountHandler(e) {
    if(containerRef.current && containerRef.current.scrollHeight) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    if (amount == '') {
      alert("Enter Amount")
      return
    }

    let type = e.target.id
    let _id = filterUser[0]._id
    const userId = localStorage.getItem('id')
    fetch(`http://localhost:4000/person/${userId}/${_id}/${type}`, {
      method: "POST",
      body: JSON.stringify({amount}),
      headers : {
        "content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data =>{
      // console.log(data)
      setFilterUser(data.frd)
      setAmountList(data.findHistory)
    })
    .catch((err) => { console.log(err)})
    setAmount('')
  }

  return (
    <main className='userList'>
      <div className=' flex  place-items-center gap-6 bg-gray-50 p-2'>
        <Link to="/" className='text-lg'>《</Link>
        {
          filterUser.map(({userName , totalAmount }) =>
            <div className='flex place-items-center justify-between w-full pr-5' key={Math.random()}>
              <div>
                <p className='text-lg '>{userName}</p>
                <span className='text-green-500'>Active Now</span>
              </div>
              <p className={totalAmount < 0 ?"text-red-500 text-xl":"text-green-500 text-xl"}> ₹ {totalAmount}</p>
            </div>
          )
        }
      </div>
      <section className='section' ref={containerRef}>
        {
          amountList.map(({ amount, date, _id }) =>
              <div className={amount > 0  ? "list justify-end" : "list justify-start"} key={_id} >
                <div className="amount-box" >
                  <p className={amount  >0 ? "text-[20px] text-red-600" : " text-[20px] text-green-500"}> ₹ {amount}</p>
                  <span className='text-sm text text-gray-500'> {date.split('T')[0]}</span>
                </div>
              </div>
          )
        }
      </section>
      <div className='bottom-0 w-full  bg-gray-50 '>
        <input type="number" placeholder='Enter Amount' className='w-3/4 block p-2 mx-auto my-2 border-2 border-gray' value={amount} onChange={e => setAmount(e.target.value)} />
        <div className='w-full border-2 border-white'></div>
        <div className='flex justify-evenly py-3'>
          <button onClick={amountHandler} id='receive' className=" border-emerald-300 bg-white  px-5 py-2 rounded-[50px] font-bold text-lg cursor-pointer text-green-500 flex place-items-center"><span className="material-symbols-outlined mr-2"> arrow_downward</span> Received</button>
          <button onClick={amountHandler} id='given' className=" border-emerald-300 bg-white  px-5 py-2 rounded-[50px] font-bold text-lg cursor-pointer text-red-500 flex place-items-center"><span className="material-symbols-outlined mr-2">arrow_upward</span> Given</button>
        </div>
      </div>
    </main>
  )
}

export default Person
