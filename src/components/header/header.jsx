import React from 'react'
import './header.css'
import home from 'img/home.png'
import { Link } from 'react-router-dom'
import slon from 'img/rocket.png'

export const Header = (props = { withElephant: true }) => {
  console.log(props)
  return (
    <>
      <Link to="/">
        <img className='home--item' src={home}></img>
      </Link>
      { props.withElephant &&
        <Link to= "/score">
          <img src={slon} className="slon--icon"></img>
        </Link>
      }
    </>
  )
}
