import React, { useEffect, useState } from 'react'
function History() {
 const [pageNo , setPageNo] =  useState(1)
 const [offSet , setOffSet] = useState(0)
 const [history , setHistory] = useState([])
 const limit = 5 ; 
 console.log(history)
 useEffect(()=>{
   console.log('object')
    const userId = localStorage.getItem('id')
    fetch(`http://localhost:4000/history/${userId}/${offSet}/${limit}`)
    .then(res => res.json())
    .then(data => setHistory(data.history))
    .catch(error => console.error(error))
 },[offSet, limit , pageNo])
  return (
    <div>
     <button onClick={()=>{
        setPageNo(prev => prev-1)
        setOffSet(prev => prev - limit)
     }} className='p-2 border-2 bg-green-800 text-center rounded-lg mx-10 '>&lt;</button>
     <span>{pageNo}</span>
     <button onClick={()=>{
        setPageNo(prev => prev + 1)
        setOffSet(prev => prev + limit)
     }} className='p-2 border-2 bg-green-800 text-center rounded-lg mx-10 '>&gt;</button>

     <section>
      {
         history.map(({amount , date , _id})=>{
            return(
               <div key={_id} className='border-2 bg-green-200' >
                  <span>{amount}</span>
                  <span>{date.split('T')[0]}</span>
               </div>
            )
         })
      }
     </section>

    </div>
  )
}

export default History
