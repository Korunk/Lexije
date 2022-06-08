import React, { useState } from 'react'
import './clock.css'

const realTime = new Date()

const minutes = realTime.getMinutes()
const hours = realTime.getHours()
export const Clock = () => {
  const minute = 25
  const minuteDeg = ((minute / 60) * 360)

  const hour = 10
  const hourDeg = ((hour / 12) * 360)
  // tady state hodin a minuty a hodiny + default hodnota 0-11 pro hodiny a 0-59 pro minuty

  /*
  tento javascript napojit na react a state a hodnota hodin a minut se bude brat ze state

    const hourHand = document.querySelector('.hourHand');
    const minuteHand = document.querySelector('.minuteHand');
    const clock = document.querySelector('.clock');

    function setDate(){
        const today = new Date();

        const minute =

        const minute = today.getMinutes();
        const minuteDeg = ((minute / 60) * 360);
        minuteHand.style.transform = `rotate(${minuteDeg}deg)`;

        const hour = today.getHours();
        const hourDeg = ((hour / 12 ) * 360 );
        hourHand.style.transform = `rotate(${hourDeg}deg)`;

        time.innerHTML = '<span>' + '<strong>' + hour + '</strong>' + ' : ' + minute + ' : ' + '<small>' + second +'</small>'+ '</span>';

        }
  */

  return (
    <>
      <p className='game-clock'>Hra hodiny!</p>
      <div className="clock">
        <div className="hourHand" onClick={() => console.log('clicknuto na hodiny')} style={{ transform: 'rotate(' + hourDeg + 'deg)' }}></div>
        <div className="minuteHand" onClick={() => console.log('clicknuto na minuty')} style={{ transform: 'rotate(' + minuteDeg + 'deg)' }}></div>
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
