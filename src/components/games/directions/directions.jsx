import React, { useState } from 'react'
import Sketch from 'react-p5'
import { Header } from 'components/header/header'
import './directions.css'
import i1 from '../../../img/PL_1_A.png'
import i2 from '../../../img/PL_1_B.png'
// import fruit from '../../../img/pomeranc.png'

export const Directions = () => {
  const [target, setTarget] = useState('')
  const [picture, setPicture] = useState()
  const [picture2, setPicture2] = useState()
  const [score, setScore] = useState(0)

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef)

    const randomNumber = p5.random(0, 1)

    setTarget(randomNumber < 0.5 ? 'left' : 'right')

    console.log({ target })
  }
  const draw = (p5) => {
    p5.background(190, 100, 0)
    p5.imageMode(p5.CENTER)
    p5.image(picture, 200, 100, 100, 100) // obrazek, ktery chci hledat
    // vygeneruji si dva obrázky, podle proměnné target, která mi říká, kde má být odpověď
    if (target === 'left') {
      p5.image(picture, 100, 300, 100, 100) // obrázek s odpovědí
      p5.image(picture2, 300, 300, 100, 100) // druhý obrázek
    } else {
      p5.image(picture, 300, 300, 100, 100) // obrázek s odpovědí
      p5.image(picture2, 100, 300, 100, 100) // druhý obrázek
    }
  }

  const preload = (p5) => {
    setPicture(p5.loadImage(i1))
    setPicture2(p5.loadImage(i2))
  }

  const mousePressed = (p5) => {
    const mouseX = p5.mouseX
    const mouseY = p5.mouseY
    let odpoved

    if (mouseX < 200 && mouseY > 200) {
      odpoved = 'left'
    } else if (mouseX > 200 && mouseY > 200) {
      odpoved = 'right'
    } else {
      console.log('tady nic není')
    }

    let result
    if (odpoved === target) {
      setScore(score + 1)
      result = 'Bingo'
      // vyhra, pokracuj dal. Dostanes ovoce a nacte se novy level
    } else {
      result = 'No'
      // neuhodnul jsi, nic nedostanes a jdes na dalsi level
    }
  }

  console.log(` tvoje score je ${score}`)
  return <>
  <Header withElephant={true}/>
          <p>Pravá - Levá</p>
        <Sketch setup={setup} draw={draw} preload={preload} mousePressed={mousePressed} />
    </>
}
