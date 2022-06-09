import React, { useContext } from 'react'
import './score.css'
import slon from 'img/rocket.png'
import fruitIcon from 'img/fruitIcon.png'
import { AppContext } from 'components/app/app'
import { TimePlaying } from 'components/timePlaying/timePlaying'

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
    if (status.hunger <= 200) {
      return (
        <div className="ukazatel-uspechu">
          <img className='fruitIcon--img' src={fruitIcon}></img>
          <div className="ukazatel-uspechu__ramecek">
            <div
              className="ukazatel-uspechu__postup"
              style={{
                width: `${status.hunger / 2}%`,
                backgroundColor: '#f4b7b7'
              }}
            ></div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <TimePlaying />
      <div className="barWrapper">
        <div className='bar'><HungerBar /></div>
      </div>
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
