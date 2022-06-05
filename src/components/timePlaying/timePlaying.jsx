import React, { useContext } from 'react'
import { AppContext } from 'components/app/app'

export const secondsLeft = (appStarted, timer) => {
  const timePlaying = ((Date.now() - appStarted) / 1000)

  return timer - timePlaying
}

export const TimePlaying = () => {
  const { status, setStatus } = useContext(AppContext)
  const { appStarted, timer } = status

  const numberOfSecondsLeft = secondsLeft(appStarted, timer)

  if (numberOfSecondsLeft > 0) {
    return (<p>Zbývá ti {Math.ceil(numberOfSecondsLeft)} vteřin.</p>)
  } else {
    return (<p>Čas vypršel!</p>)
  }
}
