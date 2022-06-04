import React from 'react'
import './header.css'
import home from '../../img/home.jpeg'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (<Link to="/"><img className='home--item' src={home}></img></Link>
  )
}
