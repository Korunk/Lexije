import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Info } from './components/info/info';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';
import { Clock } from './components/games/clock/clock';
import { Letters } from './components/games/letters/letters';
import { Directions } from './components/games/directions/directions';
import otaznik from './img/otaznik.png';
import casovac from './img/lock.png';
import slon from './img/rocket.png';

const App = () => (
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
      <img className="slon--img" src={slon} alt="slon" />
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
);

createRoot(document.querySelector('#app')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/score" element={<Score />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/info" element={<Info />} />
      <Route path="/letters" element={<Letters />} />
      <Route path="/clock" element={<Clock />} />
      <Route path="/directions" element={<Directions />} />
    </Routes>
  </BrowserRouter>,
);
