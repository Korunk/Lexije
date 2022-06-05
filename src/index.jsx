import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Info } from 'components/info/info'
import { Score, ScoreContext } from 'components/score/score'
import { Settings } from 'components/settings/settings'
import { Clock } from 'components/games/clock/clock'
import { Letters } from 'components/games/letters/letters'
import { Directions } from 'components/games/directions/directions'
import otaznik from 'img/otaznik.png'
import casovac from 'img/lock.png'
import slon from 'img/rocket.png'

const Menu = () => {
  return (
  <>
    <div className="header">
      <Link to="/info">
        <img className="header--img" src={otaznik}></img>
      </Link>
      <Link to="/settings">
        <img className="header--img" src={casovac}></img>
      </Link>
    </div>
    <div className="content">
      <h1>LeXije</h1>
      <Link to="/score"><img className="slon--img" src={slon} alt="slon" /></Link>
      <div className="menu">
        <Link to="/letters" className="menu--item">
          Hra slova
        </Link>
        <Link to="/clock" className="menu--item">
          Hra hodiny
        </Link>
        <Link to="/directions" className="menu--item">
          Hra strany
        </Link>
      </div>
    </div>
  </>
  )
}

const App = () => {
  const [score, setScore] = useState({
    hunger: 0,
    weariness: 0,
    fruits: []
  })
  const value = { score, setScore }

  return (
    <div className="appWrapper">
    <ScoreContext.Provider value={ value }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/score" element={<Score />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/info" element={<Info />} />
          <Route path="/letters" element={<Letters />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="*" element={<main style={{ padding: '1rem' }}><p>Stránka nenalezena</p></main>} />
        </Routes>
      </BrowserRouter>
    </ScoreContext.Provider>
  </div>
  )
}

createRoot(document.getElementById('app')).render(<App />)
