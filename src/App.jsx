import { useState } from "react"

function App() {
  const [newChat, setNewChat] = useState(false)
  const [userList, setUserList] = useState([])
  const [userData, setUserData] = useState({ userName: "", userAmount: "", option: "receive" })
  const [totalR, setTotalR] = useState('00')
  const [totalP, setTotalP] = useState('00')
  const [showArr ,setShowArr] =useState([])

    let amt = null;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  function formHandle(e) {
    e.preventDefault()
    setNewChat(false)
    setUserList(prev => [...prev, userData])
    if(userData.option == "receive"){
      setTotalR(prev => Number(prev) + Number(userData.userAmount))
    } 
    if(userData.option == "pending"){
      setTotalP(prev => Number(prev) + Number(userData.userAmount) )
    } 
    setUserData({ userName: "", userAmount: "", option: "receive" })
  }

  function pay(e) {
    const { name, id } = e.target
    if (name == "pay") {
       if(amt == null){
        alert('enter amount')
        return
       }
      setShowArr(prev => prev.filter(val => val !=id ))
      // setUserList(users =>users.map((user, idx)=> idx == id ?  {...user, userAmount: Number(user.userAmount) - Number(amt)}: user))
     const newUserList = userList.map((user ,idx)=>{
          if(idx == id){
            if (user.userAmount >= amt) {
              setTotalP(prev => prev - amt)
              return {...user, userAmount: Number(user.userAmount) - Number(amt)}            
            }else{
              console.log(user.userAmount, amt)
              alert("Enter Correct amount")
            }
          }
          return user
      })
      setUserList(newUserList)
    } else {
      const remind = userList.filter((val, i) => i == id)
      alert("Remind to " + remind[0].userName)
    }
  }
  function payValue(e){
      amt  = e.target.value
    }
    function addInput(e){
      const id = e.target.id
      setShowArr(prev => [...prev , id])
  }

  return (
    <>
      <section className="container ">
        <nav className="border-2 px-12 flex justify-around">
          <div>
            <span className=" border-emerald-300 border-2 px-12 mx-4 text-lg cursor-pointer">Receive</span>
            <span className=" border-emerald-300 border-2 px-12 "><strong>{totalR}</strong></span>
          </div>
          <div>
            <span className=" border-emerald-300 border-2 px-12 text-lg">Pending</span>
            <span className=" border-emerald-300 border-2 px-12 mx-4"><strong>{totalP}</strong></span>
          </div>
        </nav>
        <button className="border-solid border-cyan-600 border-2 px-3 bg-slate-300 " onClick={() => setNewChat(true)}>New Chat</button>
        {
          newChat && <div className="popup rounded-md">
            <button className="bg-red-500 px-1 rounded-md" id="delete" onClick={() => { setNewChat(false) }}>X</button>
            <form action="" className="flex flex-col gap-4" onSubmit={formHandle}>
              <input type="text" required placeholder="Enter Name" value={userData.userName} className="outline-none border-2 border-gray-800 rounded-md px-3" name="userName" onChange={handleChange} />
              <input type="number" required placeholder="Enter Amount" name="userAmount" value={userData.userAmount} className="outline-none border-2 border-gray-800 rounded-md px-3" onChange={handleChange} />
              <div className="check-box">
                <label htmlFor="receive">Receive</label>
                <input type="radio" name="option" id="receive" value={"receive"} checked={userData.option === "receive"} onChange={handleChange} />
                <label htmlFor="pending">Pending</label>
                <input type="radio" name="option" id="pending" value={"pending"} checked={userData.option === "pending"} onChange={handleChange} />
              </div>
              <button className="border-solid border-cyan-600 border-2 px-3 bg-slate-300">Add</button>
            </form>
          </div>
        }
        <main>
          {
            userList.map((val, i) =>
              <div key={Math.random()} className="bg-gray-100 m-3 flex p-4 justify-between gap-0 ">
                <div>
                  <p>{val.userName} </p>
                  <p> ₹ {val.userAmount} </p>
                </div>
               <div>
                {
                  val.option == 'receive'?<>
                   <button className=" border-emerald-300 border-2 px-6 mx-4 text-lg cursor-pointer" id={i} name={val.option == "receive" ? "receive" : "pay"} onClick={pay}>Receive</button>
                  </> 
                  : <>
                  {
                    showArr.includes(String(i)) ? <input type="number" placeholder="Enter Amount" onChange={payValue} className="outline-none border-2 border-gray-800 rounded-md px-3" /> : <span className="cursor-pointer" onClick={addInput} id={i}>{"👈"}</span>
                  }
                  <button className=" border-emerald-300 border-2 px-6 mx-4 text-lg cursor-pointer" id={i} name={val.option == "receive" ? "receive" : "pay"} onClick={pay}>Pay</button>
                  </>
                }
               </div>
              </div>
            )
          }
        </main>
      </section>
    </>
  )
}

export default App
