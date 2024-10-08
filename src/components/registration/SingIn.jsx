import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useState ,useContext } from 'react'
import { loginContext } from '../context/LoginContextProvider'
const SingIn = () => {
  const [type, setType] = useState(true)
  const navigate =  useNavigate()
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const { isLogin , setIsLogin}= useContext(loginContext)  
  function formHandle(e) {
    e.preventDefault()
    fetch("http://localhost:4000/registration/singIn", {
      method : "POST",
      body : JSON.stringify(loginData),
      headers : {
        "content-Type" : "application/json"
      },
      credentials :'include'
    })
    .then((res)=>{
      if(res.ok){
        navigate('/')
      }
        return res.json()
    })
    .then((data)=>{
      console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })
    
     setIsLogin(true)
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
              <div className="mb-4 relative">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="current-password">Password *</label>
                <input className=" border rounded w-full py-2 px-3 text-grey-darker" id="password"  type={type ? "password" : "text"} required value={loginData.password} onChange={changeHandler} placeholder="Your secure password" />
                <span className="material-symbols-outlined absolute right-2 bottom-2 cursor-pointer" onClick={() => { setType(!type) }}> {type ? "visibility_off" : "visibility"}</span>
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
