import React, { useContext, useState, useEffect } from 'react'
import { Header } from '../header/header'
import './settings.css'
import { AppContext } from 'components/app/app'

export const Settings = () => {
  const { status, setStatus } = useContext(AppContext)

  const allMinutes = String(Math.floor(status.timer / 60)).padStart(2, '0')
  const allSeconds = String(status.timer % 60).padStart(2, '0')

  const [seconds, setSeconds] = useState(allSeconds[1])
  const [secondsDecimal, setSecondsDecimal] = useState(allSeconds[0])
  const [minutes, setMinutes] = useState(allMinutes[1])
  const [minutesDecimal, setMinutesDecimal] = useState(allMinutes[0])

  useEffect(() => {
    setStatus({ ...status, ...{ timer: (Number(minutesDecimal) * 600) + (Number(minutes) * 60) + (Number(secondsDecimal) * 10) + Number(seconds) } })
  },
  [seconds, secondsDecimal, minutes, minutesDecimal]
  )

  return (
    <>
      <Header />
      <p>Nastav čas, jak dlouho může mít dítě zapnutou aplikaci.</p>
      <p>{status.timer}</p>
      <input onKeyPress={(event) => { if (/[0-6]/.test(event.key)) setMinutesDecimal(event.key) }} value={minutesDecimal} maxLength="1" />
      <input value={minutes} maxLength="1" onKeyPress={(event) => { if (/[0-9]/.test(event.key)) setMinutes(event.key) }} />
      <input value={secondsDecimal} maxLength="1" onKeyPress={(event) => { if (/[0-6]/.test(event.key)) setSecondsDecimal(event.key) }} />
      <input value={seconds} maxLength="1" onKeyPress={(event) => { if (/[0-9]/.test(event.key)) setSeconds(event.key) }} />
    </>
  )
}
