import React, { useState } from 'react'
import {useContext } from 'react'
import { Link } from 'react-router-dom'
import { contextProvider } from './components/context/UserContextProvider'
function App() {
  const {userList , setUserList , addPerson ,setAddPerson}  = useContext(contextProvider)
  const [searchValue , setSearchValue] = useState('')
  const [showData ,setShowData] = useState(userList)
  function userHandle(){ 
     if (addPerson.trim() == '') {
      alert(" Enter Name ")
       return ;
     }
     const exists = userList.some(val => val.userName.toLowerCase() == addPerson.toLowerCase())
     if(exists){
      alert("User Name All Ready Exists")
      return ;
     }
    setUserList([...userList  , { userName :  addPerson , totalAmount : 0}])
    setAddPerson('')
  }
  function searchHandle(){
    const filterData =  userList.filter(val=> val.userName.toLowerCase() == searchValue.toLowerCase())
    if(filterData.length == 0){
      alert("no user Found")
      return ;
    }
    setShowData(filterData)
    setSearchValue("")
  }



  return (
    <div>
       <nav className="border-2 py-3 px-12 flex justify-between">
          <div>
            <span className="px-12 mx-4 py-1 text-lg cursor-pointer bg-gray-50 ">Receive</span>
            <span className=" border-gray-50 border-2 px-12 bg-gray-50 py-1"><strong>00</strong></span>
          </div>
          <div>
          <span className="px-12 mx-4 py-1 text-lg cursor-pointer bg-gray-50 ">Pending</span>
          <span className=" border-gray-50 border-2 px-12 bg-gray-50 py-1"><strong>00</strong></span>
          </div>
        </nav>
       <nav className=" px-12 flex justify-between mt-5">
          <div>
            <input type="text" className='border-2 border-solid border-gray-50 px-1' placeholder='Enter Name' value={addPerson} onChange={(e)=> setAddPerson(e.target.value)}  />
            <button className='border-gray-50 border-2 bg-gray-50 px-12 ml-2' onClick={userHandle}>Add</button>
          </div>
          <div>
          <input type="text" className='border-2 border-solid border-gray-300 px-1' placeholder='Enter Name to Search' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
          <button className='border-gray-50 bg-gray-50 border-2 px-12 ml-2' onClick={searchHandle}>Search</button>
          {
            <button className='border-gray-50 bg-gray-50 border-2 px-6 ml-2' onClick={()=> setShowData(userList)}>X</button>
          }
          </div>
        </nav>
     <section className='userSection'>
        {
          showData.map(({userName , totalAmount})=>
           <Link to={`/${userName}`} key={Math.random()}>
             <div className='border-2 border-gray-100 flex justify-between mt-5 px-2 py-2 bg-gray-50'>
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
