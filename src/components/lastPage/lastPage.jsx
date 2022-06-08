import React, { useContext } from 'react'
import { AppContext } from 'components/app/app'

export const LastPage = () => {
  const { status, setStatus } = useContext(AppContext)
  const { appStarted, timer } = status
  return (
    <>
        <div>Hrál jsi: {timer}</div> {/* // sem chci dostat celkový čas, který byl nastaveny */}
        <div>Získal jsi XXX ovoce.</div>
    </>
  )
}