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
  return (
 <contextProvider.Provider value={{addPerson , setAddPerson , userList ,setUserList}}>
    {children}
 </contextProvider.Provider>
  )
}

export default UserContextProvider
