import React, { useContext} from 'react'
import { AppContext } from 'components/app/app'

export const TimePlaying = () => {
  const { status, setStatus } = useContext(AppContext)
  const timePlaying = ((Date.now() - status.appStarted) / 1000)

  if (timePlaying < status.timer) {
    let timeToEnd = (status.timer - timePlaying)
    return (<p>Zbývá ti {Math.floor(timeToEnd)} vteřin.</p>)
  }
  else {
    return (<p>Čas vypršel!</p>)
  }
}