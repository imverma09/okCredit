import React, { useContext, useEffect, useState } from 'react'
import { json, Link, useParams } from 'react-router-dom'
import { userContext } from '../context/UserContextProvider'
function Person() {
  const params = useParams()
  const { name } = params
  const [amount, setAmount] = useState("")
  const [filterUser, setFilterUser] = useState([])
  const [amountList, setAmountList] = useState([])
  const day = new Date()
  const time = day.toLocaleTimeString("en-US")

  useEffect(() => {
    fetch("http://localhost:4000/person/" + name)
      .then(res => res.json())
      .then((data)=>{
          setFilterUser(data.arr1)
          setAmountList(data.arr2)
      })
  }, [])


  function amountHandler(e) {
    if (amount == '') {
      alert("Enter Amount")
      return
    }
    let id = e.target.id
    if (id == "receive") {
      const d = filterUser.map((val) => {
        return { ...val, totalAmount: val.totalAmount - Number(amount) }
      })
      setFilterUser(d)
    } else if (id == "given") {
      const d = filterUser.map((val) => {
        return { ...val, totalAmount: val.totalAmount + Number(amount) }
      })
      setFilterUser(d)
    }

    fetch("http://localhost:4000/person/" + name, {
      method: "POST",
      body: JSON.stringify({ type: id, amount, time }),
      headers: {
        "content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => setAmountList(data))
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
              <p className='text-[20px]'> ₹ {totalAmount}</p>
            </div>
          )
        }
      </div>
      <section className='section'>
        {
          amountList.map(({ name, amt }) =>
            amt.map(({ type, amount, time }) =>
              <div className={type == 'given' ? "list justify-end" : "list justify-start"} key={Math.random()} >
                <div className="amount-box" >
                  <p className={type == 'given' ? "text-[20px] text-red-600" : " text-[20px] text-green-500"}> ₹ {amount}</p>
                  <span className='text-sm text text-gray-500'> {time}</span>
                </div>
              </div>
            )
          )
        }
      </section>
      <div className='absolute bottom-0 w-full  bg-gray-50 '>
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
