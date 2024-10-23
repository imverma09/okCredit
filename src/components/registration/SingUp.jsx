import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginContext } from '../context/LoginContextProvider'
function SingUp() {
  const { setIsLogin } = useContext(loginContext);
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const [color, setColor] = useState(true)
  const [type, setType] = useState(true)
  const navigate = useNavigate()
  function formHandle(e) {
    e.preventDefault()
    if (userData.password.length >= 6) {
      async function abc() {
        try {
          const res = await fetch("http://localhost:4000/registration/singUp", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "content-Type": "application/json"
            },
            credentials: 'include'
          })
          const data = await res.json()
          if (res.ok) {
            localStorage.setItem('id', data._id)
            navigate("/")
          }
        } catch (error) {
          console.log(error)
        }
      }
      abc()
      setColor(true)
    } else {
      setColor(false)
    }
    setIsLogin(true)
  }
  function changeHandler(e) {
    const { id, value } = e.target
    setUserData({ ...userData, [id]: value })
  }
  return (
    <form onSubmit={formHandle}>
      <div className="w-full bg-grey-lightest" style={{ "paddingTop": "4rem" }}>
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Register for a free account</div>
            <div className="py-4 px-8">
              <div className="flex mb-4">
                <div className="w-1/2 mr-1">
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="firstName">First Name *</label>
                  <input className="border rounded w-full py-2 px-3 text-grey-darker" id="firstName" type="text" required value={userData.firstName} onChange={changeHandler} placeholder="Your first name" />
                </div>
                <div className="w-1/2 ml-1">
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                  <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="lastName" type="text" value={userData.lastName} onChange={changeHandler} placeholder="Your last name" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email Address *</label>
                <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" required value={userData.email} onChange={changeHandler} placeholder="Your email address" />
              </div>
              <div className="mb-4 relative">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Password *</label>
                <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="password" type={type ? "password" : "text"} required value={userData.password} onChange={changeHandler} minLength={6} placeholder="Your secure password" />
                <span className="material-symbols-outlined absolute right-2 bottom-7 cursor-pointer" onClick={() => { setType(!type) }}> {type ? "visibility_off" : "visibility"}</span>
                <p className={color ? "text-grey text-xs mt-1" : "text-grey text-xs mt-1 text-red-600"}>At least 6 characters</p>
              </div>
              <button className='border-2 px-10 py-2 bg-green-400'>Submit</button>
            </div>
          </div>
          <p className="text-center my-4">
            <Link to={"/registration/singIn"} className="text-grey-dark text-sm no-underline hover:text-grey-darker">I already have an account</Link>
          </p>
        </div>
      </div>
    </form>
  )
}

export default SingUp
