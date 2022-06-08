import React, { useState } from 'react'
import './clock.css'

const realTime = new Date()

const minutes = realTime.getMinutes()
const hours = realTime.getHours()
export const Clock = () => {
  const [minute, setMinute] = useState(25)
  const minuteDeg = ((minute / 60) * 360)
  const [hour, setHour] = useState(10)
  const hourDeg = ((hour / 12) * 360)

  return (
    <>
      <p className='game-clock'>Nastav čas podle předlohy:</p>
      <div className='real-time'>{hours}:{minutes}</div>
      <div className="clock">
        <div className="hourHand" onClick={() => setHour(hour + 1)} style={{ transform: 'rotate(' + hourDeg + 'deg)' }}></div>
        <div className="minuteHand" onClick={() => setMinute(minute + 1)} style={{ transform: 'rotate(' + minuteDeg + 'deg)' }}></div>
        <div className="center"></div>
        <ul>
          <li><span>1</span></li>
          <li><span>2</span></li>
          <li><span>3</span></li>
          <li><span>4</span></li>
          <li><span>5</span></li>
          <li><span>6</span></li>
          <li><span>7</span></li>
          <li><span>8</span></li>
          <li><span>9</span></li>
          <li><span>10</span></li>
          <li><span>11</span></li>
          <li><span>12</span></li>
        </ul>
      </div>
    </>
  )
}
