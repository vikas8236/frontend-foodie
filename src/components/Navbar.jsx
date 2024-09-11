import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CiSearch, CiLocationOn } from 'react-icons/ci'
import { CgProfile } from 'react-icons/cg'
import { SlHandbag } from 'react-icons/sl'
import { IoHelpBuoyOutline } from 'react-icons/io5'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from '../assets/Logo.png'
import { logoutUser } from '../redux-toolkit/accountSlice'
import { fetchCart } from '../redux-toolkit/cartSlice'
import { useNavigate } from 'react-router-dom'
import { Transition } from '@headlessui/react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      window.location.reload()
      navigate('/')
    })
  }

  return (
    <div className=' bg-white h-20 flex items-center justify-between px-4 md:px-8 text-gray-600'>
      {/* Logo & Location */}
      <div className='flex items-center'>
        <Link to='/' className='flex items-center'>
          <img
            src={Logo}
            alt='TastyTrail'
            className='w-24 h-20 md:w-32 md:h-20'
          />
        </Link>
        <div className='hidden md:flex  font-bold flex-col ml-4'>
          <label className='flex items-center'>
            <CiLocationOn className='text-gray-600  text-xl' />
            <select
              name='selectedFruit'
              className='ml-2 outline-none text-gray-800 text-xl hover:text-blue-500'
            >
              <option value='indore'>Indore</option>
              <option value='pune'>Pune</option>
              <option value='delhi'>Delhi</option>
              <option value='mumbai'>Mumbai</option>
              <option value='bangalore'>Bangalore</option>
            </select>
          </label>
        </div>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className='flex items-center md:hidden'>
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className='text-2xl text-gray-800' />
          ) : (
            <FaBars className='text-2xl text-gray-800' />
          )}
        </button>
      </div>

      {/* Search Bar */}
      <Link
        to='/search'
        className='hidden md:flex items-center font-bold ml-8 text-gray-800 hover:text-blue-500'
      >
        <CiSearch className='text-2xl mr-1 ' />
        <span className='text-xl'>Search</span>
      </Link>

      {/* Help, Cart, Profile, Login/Logout */}
      <div className='hidden md:flex items-center space-x-4 ml-auto'>
        <Link
          to='/help'
          className='flex items-center font-bold text-gray-800 hover:text-blue-500'
        >
          <IoHelpBuoyOutline className='text-2xl' />
          <span className='ml-1 text-xl'>Help</span>
        </Link>

        <Link
          to='/cart'
          className='flex items-center font-bold text-gray-800 hover:text-blue-500 relative'
        >
          <SlHandbag className='text-2xl' />
          <span className='ml-1 text-xl mr-6'>Cart</span>
          {items.length > 0 && (
            <span
              className='ml-1 text-[#1a8cff] rounded-full px-2 border-2
             border-yellow-300 text-md absolute -top-1 -right-2'
            >
              {items.length}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <Link
              to={`/profile`}
              className='flex items-center font-bold text-gray-800 hover:text-blue-500'
            >
              <CgProfile className='text-xl' />
              <span className='ml-1 text-xl'>Profile</span>
            </Link>
            <button
              className='flex bg-gradient-to-r from-red-500 to-red-700 text-white items-center py-2 px-4 w-25 rounded-full font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:from-red-600 hover:to-red-800'
              onClick={handleLogout}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            to={`/login`}
            className='flex bg-gradient-to-r from-green-500 to-green-700 text-white items-center py-2 px-4 w-25 rounded-full font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:from-green-600 hover:to-green-800'
          >
            <CgProfile className='text-md' />
            <span className='ml-1 text-md'>Sign in</span>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <Transition
        show={menuOpen}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-150'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        {ref => (
          <div
            ref={ref}
            className='md:hidden absolute top-20 right-0 w-64 pl-8 bg-white shadow-lg z-10 flex flex-col'
          >
            <Link
              to='/search'
              className='flex items-center text-gray-800 hover:text-blue-500 py-2'
              onClick={toggleMenu}
            >
              <CiSearch className='text-2xl mr-1' />
              <span className='text-sm'>Search</span>
            </Link>
            <Link
              to='/cart'
              className='flex items-center text-gray-800 hover:text-blue-500 py-2'
              onClick={toggleMenu}
            >
              <SlHandbag className='text-2xl' />
              <span className='ml-1 text-sm'>Cart</span>
              {items.length > 0 && (
                <span className='ml-1 text-[#1a8cff] rounded-full bg-gray-200 px-2 py-1 text-xs'>
                  {items.length}
                </span>
              )}
            </Link>
            <Link
              to='/help'
              className='flex items-center text-gray-800 hover:text-blue-500 py-2'
              onClick={toggleMenu}
            >
              <IoHelpBuoyOutline className='text-2xl' />
              <span className='ml-1 text-sm'>Help</span>
            </Link>
            {user ? (
              <>
                <Link
                  to={`/profile`}
                  className='flex items-center text-gray-800 hover:text-blue-500 py-2'
                  onClick={toggleMenu}
                >
                  <CgProfile className='text-2xl' />
                  <span className='ml-1 text-sm'>Profile</span>
                </Link>

                <button
                  className='flex border-2 border-yellow-500 items-center mb-4 py-1 px-1 w-16 rounded-md font-medium hover:bg-red-500 hover:text-white'
                  onClick={() => {
                    handleLogout()
                    toggleMenu()
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to='/login'
                className='flex items-center text-gray-800 hover:text-blue-500 py-2'
                onClick={toggleMenu}
              >
                <CgProfile className='text-2xl' />
                <span className='ml-1 text-sm'>Login</span>
              </Link>
            )}
          </div>
        )}
      </Transition>
    </div>
  )
}

export default Navbar
