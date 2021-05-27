import React from 'react'
import { Link } from 'react-router-dom'
import YouTubeIcon from '@material-ui/icons/YouTube'
import './NavBar.css'

const NavBar = () => {
   return (
      <nav className='NavBar'>
         <Link className='logo' to={'/'}><YouTubeIcon fontSize='large'/></Link>
         <Link className='links' to='/'>Home</Link>
         <Link className='links' to={'/about'}>About</Link>
      </nav>
   )
}

export default NavBar
