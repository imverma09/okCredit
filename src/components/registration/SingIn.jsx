import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const SingIn = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  function formHandle(e) {
    e.preventDefault()
    fetch("http://localhost:4000/registration/singIn", {
      method : "POST",
      body : JSON.stringify(loginData),
      headers : {
        "content-Type" : "application/json"
      }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
      console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })
    // setLoginData({ email: "", password: "" })
  }
  function changeHandler(e) {
    const { id, value } = e.target
    setLoginData({ ...loginData, [id]: value })
  }
  return (
    <div className="w-full bg-grey-lightest" style={{ "paddingTop": "4rem" }}>
      <div className="container mx-auto py-8">
        <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
          <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Sing In</div>
          <form onSubmit={formHandle}>
            <div className="py-4 px-8">
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email Address *</label>
                <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" required value={loginData.email} onChange={changeHandler} placeholder="Your email address" />
              </div>
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="current-password">Password *</label>
                <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="password" type="password" required value={loginData.password} onChange={changeHandler} placeholder="Your secure password" />
              </div>
              <button className='border-2 px-10 py-2 bg-green-400'>Submit</button>
            </div>
          </form>
        </div>
        <p className="text-center my-4">
          <Link to={"/registration/singUp"} className="text-grey-dark text-sm no-underline hover:text-grey-darker ">SING UP</Link>
        </p>
      </div>
    </div>
  )
}

export default SingIn
