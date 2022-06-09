import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from 'components/app/app'
import './timePlaying.css'
import { LastPage } from 'components/lastPage/lastPage'
import { Header } from 'components/header/header'
import timeIcon from 'img/timeIcon.png'

export const secondsLeft = (appStarted, timer) => {
  const timePlaying = ((Date.now() - appStarted) / 1000)

  return Math.floor(timer - timePlaying)
}

export const TimePlaying = (props) => {
  const { status } = useContext(AppContext)
  const { appStarted, timer } = status
  const [secondsLeftState, setSecondsLeftState] = useState(secondsLeft(appStarted, timer))

  useEffect(() => {
    const timerEffect = setTimeout(() => {
      setSecondsLeftState(secondsLeft(appStarted, timer))
      return () => clearTimeout(timerEffect)
    }, 1000)
  }, [secondsLeftState])

  if (secondsLeftState > 0) {
    let percentTimer = secondsLeftState / timer * 100
    return (
      <>
      <Header withElephant={true}/>
      <div className="ukazatel-casu">
        <img className='timeIcon--img' src={timeIcon}></img>
        <div className="ukazatel-casu__ramecek">
          <div
            className="ukazatel-casu__postup"
            style={{
              width: `${percentTimer}%`,
              backgroundColor: '#f4b7b7'
            }}
          ></div>
        </div>
      </div>
      { props.children }
      </>)
  } else {
    return (
    <>
    <Header withElephant={true}/>
    <LastPage />
    <p className='time'>Čas vypršel!</p>
    </>)
  }
}
