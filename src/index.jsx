import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Info } from 'components/info/info'
import { Score, ScoreContext } from 'components/score/score'
import { Settings } from 'components/settings/settings'
import { Clock } from 'components/games/clock/clock'
import { Letters } from 'components/games/letters/letters'
import { Directions } from 'components/games/directions/directions'
import { Menu } from 'components/menu/menu'

const App = () => {
  const [score, setScore] = useState({
    hunger: 0,
    weariness: 0,
    fruits: []
  })
  const value = { score, setScore }

  return (
    <div className="appWrapper">
      <ScoreContext.Provider value={value}>
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
