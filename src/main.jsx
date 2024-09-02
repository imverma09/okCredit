import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Person from './components/Person.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from './components/context/UserContextProvider.jsx'
import SingUp from './components/registration/SingUp.jsx'
import SingIn from './components/registration/SingIn.jsx'
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/:name",
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
        <RouterProvider router={router} ></RouterProvider>
    </UserContextProvider>
)
