import React from 'react'
import {assets} from '../assets/assets'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img src={assets.logo} alt="" />
      <ul>
        <NavLink>
            <li>HOME</li>
            <hr />
        </NavLink>
        <NavLink>
            <li>ALL SERVICES</li>
            <hr />
        </NavLink>
        <NavLink>
            <li>ABOUT</li>
            <hr />
        </NavLink>
        <NavLink>
            <li>COMTACT</li>
            <hr />
        </NavLink>
      </ul>
      <div>
        <button>Creat Account</button>
      </div>
    </div>
  )
}

export default NavBar