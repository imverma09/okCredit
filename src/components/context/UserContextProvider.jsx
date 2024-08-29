import { createContext , useState} from "react";
export const  contextProvider = createContext()
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
 <contextProvider.Provider value={{addPerson , setAddPerson , userList ,setUserList ,showData , setShowData}}>
    {children}
 </contextProvider.Provider>
  )
}

export default UserContextProvider
