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
      <img className='slon--img' src={slon}></img>
      <div className='fruits-list'>
        {
          status.fruits.map((fruit, index) => <div className={`fruit fruit-${fruit}`} key={index}></div>)
        }
      </div>
    </>
  )
}
