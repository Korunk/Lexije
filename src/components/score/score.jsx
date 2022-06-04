import React from 'react'
import './score.css'
import { Header } from '../header/header'
import slon from 'img/rocket.png'

export const Score = () => {
  return (<><Header/>
  <p>Hlad:</p>
  <p>Únava:</p>
  <img className='slon--img' src={slon}></img></>)
}
