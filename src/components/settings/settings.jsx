import React, { useContext, useState, useEffect } from 'react'
import { Header } from '../header/header'
import './settings.css'
import { AppContext } from 'components/app/app'
import { TimePlaying } from 'components/timePlaying/timePlaying'

export const Settings = () => {
  const { status, setStatus } = useContext(AppContext)

  const allMinutes = String(Math.floor(status.timer / 60)).padStart(2, '0')
  const allSeconds = String(status.timer % 60).padStart(2, '0')

  const [seconds, setSeconds] = useState(allSeconds[1])
  const [secondsDecimal, setSecondsDecimal] = useState(allSeconds[0])

  const [minutes, setMinutes] = useState(allMinutes[1])
  const [minutesDecimal, setMinutesDecimal] = useState(allMinutes[0])

  useEffect(() => {
    setStatus({
      ...status,
      ...{
        timer:
        (Number(minutesDecimal) * 600) +
        (Number(minutes) * 60) +
        (Number(secondsDecimal) * 10) +
        Number(seconds)
      },
      ...{
        appStarted: Date.now()
      }
    })
  }, [seconds, secondsDecimal, minutes, minutesDecimal])

  console.log(status.timer)

  return (
    <>
      <Header/>

      <p>Nastav čas, jak dlouho může mít dítě zapnutou aplikaci.</p>
      <TimePlaying/>

      <input
        maxLength="1"
        value={minutesDecimal}
        onKeyPress={(event) => {
          if (/[0-5]/.test(event.key)) setMinutesDecimal(event.key)
        }}
      />

      <input
        maxLength="1"
        value={minutes}
        onKeyPress={(event) => {
          if (/[0-9]/.test(event.key)) setMinutes(event.key)
        }}
      />

      <input
        maxLength="1"
        value={secondsDecimal}
        onKeyPress={(event) => {
          if (/[0-5]/.test(event.key)) setSecondsDecimal(event.key)
        }}
      />

      <input
        maxLength="1"
        value={seconds}
        onKeyPress={(event) => {
          if (/[0-9]/.test(event.key)) setSeconds(event.key)
        }}
      />
    </>
  )
}
