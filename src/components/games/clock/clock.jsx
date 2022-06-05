import { Header } from 'components/header/header'
import React, { useState } from 'react'
import Sketch from 'react-p5'
import './clock.css'
import clockImg from '../../../img/clock.png'

export const Clock = () => {
  let hodinyImg
  const [timeTask, setTimeTask] = useState('12:35')
  let buttonReload
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 460).parent(canvasParentRef)
  }
  const draw = (p5) => {
    p5.background(190, 100, 0)
    p5.imageMode(p5.CENTER)
    p5.image(hodinyImg, 200, 260, 350, 350)

    // time task in the header
    p5.textSize(20)
    p5.noStroke()
    p5.fill(0)
    p5.text(`${timeTask}`, 180, 40)

    // button to reloadTimeTask
    buttonReload = p5.createButton('reload Time')
    buttonReload.position(280, 40)
    buttonReload.mousePressed(newTime)
  }
  const newTime = () => {
    setTimeTask('18:50')
    console.log(timeTask)
  }
  const preload = (p5) => {
    hodinyImg = p5.loadImage(clockImg)
  }
  const mousePressed = (p5) => {}

  return (<>
    <Header withElephant={true}/>
    <p>Hodiny</p>
    <Sketch setup={setup} draw={draw} preload={preload} mousePressed={mousePressed} />
  </>)
}
