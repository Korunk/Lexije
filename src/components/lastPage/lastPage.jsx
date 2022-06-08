import React, { useContext } from 'react'
import { AppContext } from 'components/app/app'

export const LastPage = () => {
  const { status } = useContext(AppContext)
  const { timer } = status
  const minuty = Math.floor(timer / 60)
  const vteriny = timer % 60
  return (
    <>
        <div>Hrál jsi: {minuty} : {vteriny}</div> {/* // sem chci dostat celkový čas, který byl nastaveny */}
        {/* <div>Získal jsi {status.fruitCount} ovoce.</div> */}
        <div>Získal jsi ovoce: {status.fruitCount}</div>
    </>
  )
}
