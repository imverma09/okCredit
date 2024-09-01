import { createContext , useState} from "react";
export const  userContext = createContext()
function UserContextProvider({children}) {
    const [addPerson, setAddPerson] = useState("")
    const [userList , setUserList] =useState([
        {
          userName : "Harsh",
          totalAmount : 0
        },
        {
          userName : "John Wick",
          totalAmount : 0
        },
        {
          userName : "Daniel",
          totalAmount : 0
        },
      ])

      const [showData, setShowData] = useState(userList)
  return (
 <userContext.Provider value={{addPerson , setAddPerson , userList ,setUserList ,showData , setShowData}}>
    {children}
 </userContext.Provider>
  )
}

export default UserContextProvider
