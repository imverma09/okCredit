import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from './components/context/UserContextProvider'
import List from './components/List'
import { loginContext } from './components/context/LoginContextProvider'
function App() {
  const { userList, setUserList, addPerson, setAddPerson } = useContext(userContext)
  const { isLogin } = useContext(loginContext)
  const [searchValue, setSearchValue] = useState('')
  function userHandle() {
    if (addPerson.trim() == '') {
      alert("Enter Name ")
      return;
    }
    const exists = userList.some(val => val.userName.toLowerCase() == addPerson.toLowerCase())
    if (exists) {
      alert("User Name All Ready Exists")
      return;
    }
    // ADD USERLIST IN A ARRAY  
    fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify({ userName: addPerson, totalAmount: 0 }),
      headers: {
        "content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setUserList(data))
      .catch(err => console.log(err));
    setAddPerson('')
  }

  // useEffect(() => {
  //   fetch('http://localhost:4000')
  //     .then(response => response.json())
  //     .then(data => setUserList(data))
  //     .catch(error => console.error('Error :', error));
  // }, [])
  // SEARCH FUNCTION 
  const filterData = searchValue.length === 0 ? userList : userList.filter(user => user.userName.toLowerCase().includes(searchValue.toLowerCase()))
  return (
    <div>
      <nav className="py-3 px-12 flex justify-between flex-wrap gap-10">
        <div>
          <span className="border-gray-50 border-2 px-6 bg-gray-50 py-1 mx-4"><strong className='text-green-500'>00</strong></span>
          <span className="border-gray-50 border-2 px-6 bg-gray-50 py-1"><strong className='text-red-500'>00</strong></span>
        </div>
        <div>
          {
            !isLogin ? <Link to={"/registration/singUp"} className='mx-4'><span className="px-12 py-1 text-lg cursor-pointer bg-gray-50 ">Sign Up</span></Link> : <Link to={"/registration/singIn"}><span className="px-12 py-1 text-lg cursor-pointer bg-gray-50 ">Sign In</span></Link>
          }
        </div>
      </nav>
      <section className=" px-[20px] flex justify-between mt-5 flex-wrap gap-8">
        <div className='flex gap-4 flex-wrap '>
          <input type="text" className='border-2 border-solid border-gray-50 px-1' placeholder='Enter Name' value={addPerson} onChange={(e) => setAddPerson(e.target.value)} />
          <button className='border-gray-50 border-2 bg-gray-50 px-12 ml-2' onClick={userHandle}>Add</button>
        </div>
        <div>
          <input type="text" className='border-2 border-solid border-gray-300 px-1' placeholder='Enter Name to Search' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          <button className='border-gray-50 bg-gray-50 border-2 px-12 ml-2' >Search</button>
        </div>
      </section>
      <List filterData={filterData} />
    </div>
  )
}

export default App
