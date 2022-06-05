import React, { useContext, useState } from 'react'
import { Header } from '../header/header'
import './settings.css'
import { AppContext } from 'components/app/app'

export const Settings = () => {
  const { status, setStatus } = useContext(AppContext)
  const minutes = String(Math.floor(status.timer / 60)).padStart(2, '0')
  const seconds = String(status.timer % 60).padStart(2, '0')
  
console.log(minutes, seconds)
  return (
    <>
      <Header />
      <p>Nastav čas, jak dlouho může mít dítě zapnutou aplikaci.</p>
      <p>{status.timer}</p>
      <input onKeyPress={(event) => { if (/[0-6]/.test(event.key)) setStatus({...status, ...{ timer: event.key*6000 }})}} value={minutes[0]} maxLength="1" />
      <input value={minutes[1]} maxLength="1" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }} />
      <input value={seconds[0]} maxLength="1" onKeyPress={(event) => { if (!/[0-6]/.test(event.key)) { event.preventDefault() } }} />
      <input value={seconds[1]} maxLength="1" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }} />
    </>
  )
}
