import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { contextProvider } from './context/UserContextProvider'
function Person() {
  const params = useParams()
  const { userList } = useContext(contextProvider)
  const { name } = params
  const filterUser = userList.filter((user) => user.userName == name)
  const [amount ,setAmount] = useState("")
  function valueHandle(e){
      setAmount(e.target.value)
  }
  return (
    <main className='userList'>
      <div className=' flex  place-items-center gap-6 bg-gray-50 p-2'>
        <Link to="/" className='text-lg'>《</Link>
        {
          filterUser.map((val) =>
            <div className='flex place-items-center justify-between w-full pr-5' key={Math.random()}>
              <div>
                <p className='text-lg'>{val.userName}</p>
                <span className='text-green-500'>Active Now</span>
              </div>
              <p>{val.totalAmount}</p>
            </div>
          )
        }
      </div>
      <div className='absolute bottom-0 w-full  bg-gray-50 '>
        <input type="number" placeholder='Enter Amount' className='w-3/4 block p-2 mx-auto my-2 border-2 border-gray' value={amount} onChange={valueHandle} />
        <div className='w-full border-2 border-white'></div>
        <div className='flex justify-evenly py-3'>
          <button className=" border-emerald-300 bg-white  px-5 py-2 rounded-[50px] font-bold text-lg cursor-pointer text-green-500 flex place-items-center"><span className="material-symbols-outlined mr-2">arrow_upward</span> Received</button>
          <button className=" border-emerald-300 bg-white  px-5 py-2 rounded-[50px] font-bold text-lg cursor-pointer text-red-500 flex place-items-center"><span className="material-symbols-outlined mr-2">arrow_downward</span> Given</button>
        </div>
      </div>
    </main>
  )
}

export default Person
