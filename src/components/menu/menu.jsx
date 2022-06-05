import React from 'react'
import { Link } from 'react-router-dom'
import otaznik from 'img/otaznik.png'
import casovac from 'img/lock.png'
import slon from 'img/elephant-body.png'
import './menu.css'

export const Menu = () => {
  return (
    <>
      <div className="header">
        <Link to="/info">
          <img className="header--img" src={otaznik}></img>
        </Link>
        <Link to="/settings">
          <img className="header--img" src={casovac}></img>
        </Link>
      </div>
      <div className="content">
        <h1>LeXije</h1>
        <Link to="/score"><img className="slon--img" src={slon} alt="slon" /></Link>
        <div className="menu">
          <Link to="/letters" className="menu--item">
            Hra slova
          </Link>
          <Link to="/clock" className="menu--item">
            Hra hodiny
          </Link>
          <Link to="/directions" className="menu--item">
            Hra strany
          </Link>
        </div>
      </div>
    </>
  )
}
