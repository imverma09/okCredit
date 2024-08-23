import React from 'react'
import {useContext } from 'react'
import { Link } from 'react-router-dom'
import { contextProvider } from './components/context/UserContextProvider'
function App() {
  const {userList , setUserList , addPerson ,setAddPerson}  = useContext(contextProvider)
  function userHandle(){ 
    setUserList([...userList  , { userName :  addPerson , totalAmount : 0}])
    setAddPerson('')
  }
  return (
    <div>
       <nav className="border-2 px-12 flex justify-between">
          <div>
            <span className=" border-emerald-300 border-2 px-12 mx-4 text-lg cursor-pointer">Receive</span>
            <span className=" border-emerald-300 border-2 px-12 "><strong>00</strong></span>
          </div>
          <div>
            <span className=" border-emerald-300 border-2 px-12 text-lg">Pending</span>
            <span className=" border-emerald-300 border-2 px-12 mx-4"><strong>00</strong></span>
          </div>
        </nav>
       <nav className=" px-12 flex justify-between mt-5">
          <div>
            <input type="text" className='border-2 border-solid border-emerald-300 px-1' placeholder='Enter Name' value={addPerson} onChange={(e)=> setAddPerson(e.target.value)}  />
            <button className='border-emerald-300 border-2 px-12 ml-2' onClick={userHandle}>Add</button>
          </div>
          <div>
          <input type="text" className='border-2 border-solid border-emerald-300 px-1' placeholder='Enter Name to Search' />
          <button className='border-emerald-300 border-2 px-12 ml-2'>Search</button>
          </div>
        </nav>
     <section className='userSection'>
        {
          userList.map(({userName , totalAmount})=>
           <Link to={`/${userName}`} key={Math.random()}>
             <div className='border-2 border-emerald-300 flex justify-between mt-5 px-2 py-2'>
                    <p className='text-xl'>{userName}</p>
                    <p className='text-xl'>{totalAmount}</p>
                  </div>
           </Link>
          )
        }
    </section>
    </div>
  )
}

export default App
