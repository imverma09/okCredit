import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom'
function SingUp() {
  const [userData, setUserData] = useState({firstName :"",lastName :"",email : "", password : "" })
  function formHandle(e){
    e.preventDefault()
   console.log(userData)
  }
  function changeHandler(e){
     const {id , value} = e.target
     setUserData({...userData , [id] : value})
  }
  return (   
      <form onSubmit={formHandle}>
      <div className="w-full bg-grey-lightest" style={{"paddingTop": "4rem"}}>
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Register for a free account</div>
            <div className="py-4 px-8">
              <div className="flex mb-4">
                <div className="w-1/2 mr-1">
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="firstName">First Name *</label>
                  <input className="border rounded w-full py-2 px-3 text-grey-darker" id="firstName" type="text" value={userData.firstName} onChange={changeHandler} placeholder="Your first name"/>
                </div>
                <div className="w-1/2 ml-1">
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                  <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="lastName" type="text" value={userData.lastName} onChange={changeHandler} placeholder="Your last name"/>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email Address *</label>
                <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" value={userData.email} onChange={changeHandler} placeholder="Your email address"/>
              </div>
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Password *</label>
                <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="password" type="password" value={userData.password} onChange={changeHandler}  placeholder="Your secure password"/>
                  <p className="text-grey text-xs mt-1">At least 6 characters</p>
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
