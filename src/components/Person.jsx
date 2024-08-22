import React from 'react'
import { Link, useParams } from 'react-router-dom'
function Person() {
 const params =  useParams()
  const {name} = params
  return (
    <main className='userList'>
      <Link to="/" className='text-lg'>《</Link>
      
    </main>
  )
}

export default Person
