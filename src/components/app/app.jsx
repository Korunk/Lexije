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
import { TimePlaying } from 'components/timePlaying/timePlaying'

const DEFAULT_APP_STATUS = {
  hunger: 10,
  weariness: 0,
  fruits: ['banana', 'cherry', 'pear'],
  fruitCount: 0,
  timer: 600,
  appStarted: Date.now(),
  clockTick: 0
}

export const App = () => {
  const [status, setStatus] = useState(DEFAULT_APP_STATUS)
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
            <Route path="/letters" element={<TimePlaying> <Letters /></TimePlaying>} />
            <Route path="/clock" element={<TimePlaying ><Clock /> </TimePlaying>} />
            <Route path="/directions" element={<TimePlaying ><Directions /></TimePlaying>} />
            <Route path="*" element={<main style={{ padding: '1rem' }}><p>Stránka nenalezena</p></main>} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  )
}

export const AppContext = createContext({
  status: DEFAULT_APP_STATUS,
  setStatus: () => { }
})
