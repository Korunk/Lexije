import React, { createContext, useContext } from 'react'
import './score.css'
import { Header } from '../header/header'
import slon from 'img/rocket.png'

export const Score = () => {
  const { score, setScore } = useContext(ScoreContext)

  return (<><Header/>
  <p>Hlad:</p>
  <p>Únava:</p>
  <p>{score.fruits}</p>
  <img className='slon--img' src={slon}></img></>)
}

export const ScoreContext = createContext({
  score: {
    hunger: 0,
    weariness: 0,
    fruits: []
  },
  setScore: () => {}
})
