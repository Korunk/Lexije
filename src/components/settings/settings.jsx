import React, { useContext, useState, useEffect } from 'react'
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
  const [disabled, setDisabled] = useState(false)

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
  return (
    <>
      <TimePlaying/>
      <p className='timer'>Nastav čas, jak dlouho může mít dítě zapnutou aplikaci.</p>

      <input
        maxLength="1"
        value={minutesDecimal}
        onKeyPress={(event) => {
          if (/[0-5]/.test(event.key)) setMinutesDecimal(event.key)
        }
      }disabled={disabled}
      />

      <input
        maxLength="1"
        value={minutes}
        onKeyPress={(event) => {
          if (/[0-9]/.test(event.key)) setMinutes(event.key)
        }}
        disabled={disabled}
      />
       :
      <input
        maxLength="1"
        value={secondsDecimal}
        onKeyPress={(event) => {
          if (/[0-5]/.test(event.key)) setSecondsDecimal(event.key)
        }}disabled={disabled}
      />

      <input
        maxLength="1"
        value={seconds}
        onKeyPress={(event) => {
          if (/[0-9]/.test(event.key)) setSeconds(event.key) }}disabled={disabled}
          />
<button disabled={disabled} onClick={() => {setDisabled(true) && Settings()}}>Spustit čas</button>
    </>
  )}