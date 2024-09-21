import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Person from './components/Person/Person.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from './components/context/UserContextProvider.jsx'
import SingUp from './components/registration/SingUp.jsx'
import SingIn from './components/registration/SingIn.jsx'
import LoginContextProvider from './components/context/LoginContextProvider.jsx'
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/person/:name",
        element: <Person />
    },
    {
        path: "/registration/singUp",
        element: <SingUp />
    },
    {
        path: "/registration/singIn",
        element: <SingIn />
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <LoginContextProvider>
            <RouterProvider router={router} ></RouterProvider>
        </LoginContextProvider>
    </UserContextProvider>
)
