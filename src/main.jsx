import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Person from './components/Person.jsx'
import './index.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom' 
const router = createBrowserRouter([
    {path : "/",
     element : <App/>   
    },
    {path : "/:name",
     element : <Person/>   
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} ></RouterProvider>
)
