import React, { useContext } from 'react'
import './score.css'
import { Header } from '../header/header'
import slon from 'img/rocket.png'
import { AppContext } from 'components/app/app'

export const Score = () => {
  const { status, setStatus } = useContext(AppContext)

  const handleFruitClick = (fruitIndex) => {
    if (status.hunger > 0) {
      status.fruits.splice(fruitIndex, 1)
      setStatus({
        ...status,
        ...{ hunger: status.hunger - Math.min(status.hunger, 10) },
        ...{ fruits: status.fruits }
      })
      console.log(status)
    }
  }

  return (
    <>
      <Header />
      <p>Hlad: {status.hunger}</p>
      <p>Únava: {status.weariness}</p>
      <img className='slon--img' src={slon}></img>
      <div className='fruits-wrapper'>
        <div className='fruits-list'>
          {
            status.fruits.map((fruit, index) =>
              <div className={`fruit fruit-${fruit}`} key={index} onClick={() => handleFruitClick(index)}></div>
            )
          }
        </div>
      </div>
    </>
  )
}
