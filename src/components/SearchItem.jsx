import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true'
}
const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ products: [], restaurants: [] })

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://foodie-eight-ruby.vercel.app/searchApi/search/?q=${query}`,
        { headers }
      )
      setResults(response.data)
    } catch (error) {
      console.error('Error searching:', error)
    }
  }

  React.useEffect(() => {
    if (query.length > 0) {
      handleSearch()
    } else {
      setResults({ products: [], restaurants: [] })
    }
  }, [query])

  return (
    <div className='w-full h-full py-4 '>
      <div className='w-full h-16 flex justify-center '>
        <input
          type='text'
          placeholder='Search Food'
          onChange={e => setQuery(e.target.value)}
          className='w-1/3 h-full p-8 rounded-lg outline-none shadow-lg'
        />
      </div>
      {/* Data Display */}
      <div className='mt-2 w-full h-full bg-[#ffffff] mb-8'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center w-full h-full'>
          {results.products.map(product => (
            <Link to={`/category/${product.id}`} key={product.id}>
              <div
                className='md:w-[300px] w-[220px] cursor-pointer bg-white shadow-stone-400 rounded-md'
                key={product?.id}
              >
                <div className='w-full h-48'>
                  <img
                    src={product.image}
                    alt=''
                    className='object-contain rounded-xl w-[220px] md:w-[450px] h-48'
                  />
                </div>
              </div>
            </Link>
          ))}
          {results.restaurants.map(restaurant => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              <div className='md:w-[300px] w-[220px] cursor-pointer bg-white shadow-stone-400 rounded-md mt-4 p-0 transform transition-transform duration-400 hover:scale-90'>
                <div className='w-full h-48'>
                  <img
                    src={restaurant?.resImage}
                    alt=''
                    className='object-cover z-0 rounded-xl w-[220px] md:min-w-[300px] h-48'
                  />
                  <p className='z-10 mt-[-30px] text-white text-xl font-bold ml-3'>
                    {restaurant?.offer}
                  </p>
                </div>
                <div className='w-full h-full'>
                  <p className='text-md text-gray-800 md:text-xl px-2 font-semibold font-sans truncate'>
                    {restaurant?.resName}
                  </p>
                  <div className='px-2'>
                    <p className='flex'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGenF_VBi-3q4TH74Tmv0cU2F38L2L55-fg&s'
                        alt=''
                        className='rounded-full w-4 mt-2 h-4'
                      />
                      <span className='text-lg text-slate-700 font-sans px-2 font-semibold'>
                        {restaurant?.rating} | {restaurant?.estimated_time}
                      </span>
                    </p>
                    <p className='text-md text-slate-600 md:text-[14px] truncate font-medium'>
                      {restaurant?.menue}
                    </p>
                    <p className='text-md text-slate-600 md:text-[14px] truncate font-medium'>
                      {restaurant?.locality}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar

