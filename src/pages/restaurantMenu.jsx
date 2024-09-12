import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true'
}

const RestaurantMenu = () => {
  const { id } = useParams()
  const [menuItems, setMenuItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(
      `https://foodie-eight-ruby.vercel.app/restaurants/restaurants/${id}/menu_items/`,
      { headers }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => setMenuItems(data))
      .catch(error => {
        console.error('Error fetching menu items:', error)
        setError(error.message)
      })
  }, [id])

  if (error) {
    return (
      <div className='text-red-500 text-center mt-4'>
        Error fetching menu items: {error}
      </div>
    )
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-xl font-mediam font-serif text-center text-gray-800 mb-8 relative'>M E N U</h1>
      <div className='space-y-6'>
        {menuItems.map(item => (
          <div
            key={item.id}
            className='bg-white shadow-lg rounded-lg overflow-hidden flex items-center p-4'
          >
            <div className='flex-grow'>
              <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                {item.productName}
              </h2>
              <p className='text-lg text-gray-700 font-semibold mb-1'>
                ₹{item.price}
              </p>
              <p className='text-gray-600'>{item.description}</p>
            </div>
            {item.productImage && (
              <div className='flex-shrink-0 ml-4'>
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className='w-32 h-32 object-cover rounded-md'
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantMenu
