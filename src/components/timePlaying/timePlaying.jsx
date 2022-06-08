import React, { useContext } from 'react'
import { AppContext } from 'components/app/app'
import './timePlaying.css'
import { LastPage } from 'components/lastPage/lastPage'
import { Header } from 'components/header/header'

export const secondsLeft = (appStarted, timer) => {
  const timePlaying = ((Date.now() - appStarted) / 1000)

  return timer - timePlaying
}

export const TimePlaying = (props) => {
  const { status, setStatus } = useContext(AppContext)
  const { appStarted, timer } = status

  const numberOfSecondsLeft = secondsLeft(appStarted, timer)

  if (numberOfSecondsLeft > 0) {
    return (
      <>
      <Header withElephant={true}/>
      <p className='time'>Zbývá ti {Math.floor(numberOfSecondsLeft / 60)} a {Math.round(numberOfSecondsLeft % 60)} vteřin.
      </p>
      {props.children }
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
