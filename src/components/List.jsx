import { Link } from 'react-router-dom'
function List({filterData}) {

  return (
    <section className='userSection'>
        {
          filterData.map(({ userName, totalAmount }) =>
            <Link to={`/person/${userName}`} key={Math.random()}>
              <div className='border-2 border-gray-100 flex justify-between mt-5 px-2 py-2 bg-gray-50'>
                <p className='text-xl'>{userName}</p>
                <p className={totalAmount < 0 ?"text-red-500 text-xl":"text-green-500 text-xl"}> ₹ {totalAmount}</p>
              </div>
            </Link>
          )
        }
      </section>
  )
}

export default List
