import React, { useContext } from 'react'
import './score.css'
import { Header } from '../header/header'
import slon from 'img/rocket.png'
import { AppContext } from 'components/app/app'

export const Score = () => {
  const { status } = useContext(AppContext)

  return (
    <>
      <Header />
      <p>Hlad:</p>
      <p>Únava:</p>
      <p>{status.fruits}</p>
      <img className='slon--img' src={slon}></img>
    </>
  )
}
