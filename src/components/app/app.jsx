import React, { useState, createContext } from 'react'
import './app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Info } from 'components/info/info'
import { Score } from 'components/score/score'
import { Settings } from 'components/settings/settings'
import { Clock } from 'components/games/clock/clock'
import { Letters } from 'components/games/letters/letters'
import { Directions } from 'components/games/directions/directions'
import { Menu } from 'components/menu/menu'

export const App = () => {
  const [status, setStatus] = useState({
    hunger: 0,
    weariness: 0,
    fruits: [],
    timer: 601
  })
  const value = { status, setStatus }

  return (
    <div className="appWrapper">
      <AppContext.Provider value={value}>
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
      </AppContext.Provider>
    </div>
  )
}

export const AppContext = createContext({
  status: {
    hunger: 0,
    weariness: 0,
    fruits: [],
    timer: 600
  },
  setStatus: () => { }
})
