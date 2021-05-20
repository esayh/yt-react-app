import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
   return (
      <nav className='navBar'>
         <Link className='links' to={'/'}>Youtube</Link>{' '}
         <Link className='links' to={'about'}>About</Link>
      </nav>
   )
}

export default NavBar
