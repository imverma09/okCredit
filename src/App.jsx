import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { contextProvider } from './components/context/UserContextProvider'
function App() {

  const { userList, setUserList, addPerson, setAddPerson } = useContext(contextProvider)
  const [searchValue, setSearchValue] = useState('')
  function userHandle() {
    if (addPerson.trim() == '') {
      alert(" Enter Name ")
      return;
    }
    const exists = userList.some(val => val.userName.toLowerCase() == addPerson.toLowerCase())
    if (exists) {
      alert("User Name All Ready Exists")
      return;
    }
    setUserList([...userList, { userName: addPerson, totalAmount: 0 }])
    setAddPerson('')
  }

  // SEARCH FUNCTION 
  useEffect(() => {
    const data = searchValue.length === 0 ? userList : userList.filter(user => user.userName.toLowerCase().includes(searchValue.toLowerCase()))
    setUserList(data)
  }, [searchValue])

  return (
    <div>
      <nav className="border-2 py-3 px-12 flex justify-between">
        <div>
          <span className=" border-gray-50 border-2 px-12 bg-gray-50 py-1"><strong className='text-red-500'>00</strong></span>
          <span className=" border-gray-50 border-2 px-12 bg-gray-50 py-1 mx-4"><strong className='text-green-500'>00</strong></span>
        </div>
        <div>
          <Link to={"/registration/singUp"} className='mx-4'><span className="px-12 py-1 text-lg cursor-pointer bg-gray-50 ">Sign Up</span></Link>
          <Link to={"/registration/singIn"}><span className="px-12 py-1 text-lg cursor-pointer bg-gray-50 ">Sign In</span></Link>
        </div>
      </nav>
      <nav className=" px-12 flex justify-between mt-5">
        <div>
          <input type="text" className='border-2 border-solid border-gray-50 px-1' placeholder='Enter Name' value={addPerson} onChange={(e) => setAddPerson(e.target.value)} />
          <button className='border-gray-50 border-2 bg-gray-50 px-12 ml-2' onClick={userHandle}>Add</button>
        </div>
        <div>
          <input type="text" className='border-2 border-solid border-gray-300 px-1' placeholder='Enter Name to Search' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          <button className='border-gray-50 bg-gray-50 border-2 px-12 ml-2' >Search</button>
        </div>
      </nav>
      <section className='userSection'>
        {
          userList.map(({ userName, totalAmount }) =>
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
