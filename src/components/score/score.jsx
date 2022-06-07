import React, { useContext, useState } from 'react'
import './score.css'
import { Header } from '../header/header'
import slon from 'img/rocket.png'
import { AppContext } from 'components/app/app'

export const Score = () => {
  const { status, setStatus } = useContext(AppContext)

  const handleFruitClick = (fruitIndex) => {
    if (status.hunger < 200) {
      status.fruits.splice(fruitIndex, 1)
      setStatus({
        ...status,
        ...{ hunger: status.hunger + Math.min(status.hunger, 10) },
        ...{ fruits: status.fruits }
      })
    }
  }

  const HungerBar = () => {
    return (
      <div className="ukazatel-uspechu">
        <div className="ukazatel-uspechu__ramecek">
          <div
            className="ukazatel-uspechu__postup"
            style={{
              width: `${status.hunger}%`,
              backgroundColor: 'limegreen'
            }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <p>Plné bříško: {status.hunger}</p> <HungerBar />
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
