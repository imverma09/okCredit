import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { contextProvider } from './context/UserContextProvider'
function Person() {
  const params = useParams()
  const { userList } = useContext(contextProvider)
  const { name } = params
  const filterUser = userList.filter((user) => user.userName == name)
  const [amount, setAmount] = useState("")
  const [amountList, setAmountList] = useState([])
  const day = new Date()
  const time = day.toLocaleTimeString("en-US")
  function amountHandler(e) {
    setAmountList([...amountList, { type: e.target.id, amount, time }])
  }
  return (
    <main className='userList'>
      <div className=' flex  place-items-center gap-6 bg-gray-50 p-2'>
        <Link to="/" className='text-lg'>《</Link>
        {
          filterUser.map((val) =>
            <div className='flex place-items-center justify-between w-full pr-5' key={Math.random()}>
              <div>
                <p className='text-lg '>{val.userName}</p>
                <span className='text-green-500'>Active Now</span>
              </div>
              <p>{val.totalAmount}</p>
            </div>
          )
        }
      </div>
      <section className='section'>
      {
        amountList.map(({ amount, type, time }) =>
          <div className={type == 'given' ? "list justify-end" : "list justify-start"}>
            <div className="amount-box" key={Math.random()}>
              <p className='text-[20px]'> ₹ {amount}</p>
              <span className='text-sm text text-gray-500'> {time}</span>
            </div>
          </div>
        )
      }
      </section>
      <div className='absolute bottom-0 w-full  bg-gray-50 '>
        <input type="number" placeholder='Enter Amount' className='w-3/4 block p-2 mx-auto my-2 border-2 border-gray' value={amount} onChange={e => setAmount(e.target.value)} />
        <div className='w-full border-2 border-white'></div>
        <div className='flex justify-evenly py-3'>
          <button onClick={amountHandler} id='receive' className=" border-emerald-300 bg-white  px-5 py-2 rounded-[50px] font-bold text-lg cursor-pointer text-green-500 flex place-items-center"><span className="material-symbols-outlined mr-2">arrow_upward</span> Received</button>
          <button onClick={amountHandler} id='given' className=" border-emerald-300 bg-white  px-5 py-2 rounded-[50px] font-bold text-lg cursor-pointer text-red-500 flex place-items-center"><span className="material-symbols-outlined mr-2">arrow_downward</span> Given</button>
        </div>
      </div>
    </main>
  )
}

export default Person
