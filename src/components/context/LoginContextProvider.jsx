import { createContext, useState } from "react";
export const loginContext = createContext()

function LoginContextProvider({children}) {
    const [isLogin, setIsLogin] = useState(false)
    return (
        <loginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </loginContext.Provider>
    )
}

export default LoginContextProvider;