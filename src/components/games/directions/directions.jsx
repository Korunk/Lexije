import React, { useState } from 'react'
import Sketch from 'react-p5'
import { Header } from 'components/header/header'
import './directions.css'
import images from './images'
import levels from './levels.json'

const DEFAULT_SETTINGS = {
  levelNumber: 0,
  gameState: 'PLAYING',
  transitionDuration: 120,
  transitionCountDouwn: 60
}
let sadElephant, fruit, bodyElephant
let answered = false
const imgWrong = {}
const imgRight = {}
let result

export const Directions = () => {
  const [target, setTarget] = useState('')
  const [score, setScore] = useState(0)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef)
    const randomNumber = p5.random(0, 1)
    setTarget(randomNumber < 0.5 ? 'left' : 'right')
    console.log({ target })
  }

  const draw = (p5) => {
    const { gameState } = settings
    p5.background(190, 100, 0)
    p5.imageMode(p5.CENTER)

    switch (gameState) {
      case 'PLAYING':
        drawPlayScreenDirection(p5)
        break
      case 'TRANSITION':
        drawTransitionScreenDirection(p5)
        break
      case 'END':
        drawEndScreenDirection(p5)
        break
    }
  }

  const drawPlayScreenDirection = (p5) => {
    const { levelNumber, transitionDuration } = settings

    const levelPictureRight = imgRight[levelNumber]
    const levelPictureWrong = imgWrong[levelNumber]

    p5.image(levelPictureRight, 200, 100, 100, 100) // obrazek, ktery chci hledat
    // vygeneruji si dva obrázky, podle proměnné target, která mi říká, kde má být odpověď
    if (target === 'left') {
      p5.image(levelPictureRight, 100, 300, 100, 100) // obrázek s odpovědí
      p5.image(levelPictureWrong, 300, 300, 100, 100) // druhý obrázek
    } else {
      p5.image(levelPictureRight, 300, 300, 100, 100) // obrázek s odpovědí
      p5.image(levelPictureWrong, 100, 300, 100, 100) // druhý obrázek
    }

    if (isLevelFinished()) {
      setSettings({
        ...settings,
        ...{ transitionCountdown: transitionDuration },
        ...{ gameState: 'TRANSITION' }
      })
    }
  }

  const drawTransitionScreenDirection = (p5) => {
    const { transitionCountdown, levelNumber } = settings

    if (transitionCountdown > 0) {
      setSettings({
        ...settings,
        ...{ transitionCountdown: transitionCountdown - 1 }
      })
      if (result === 'Bingo') {
        p5.imageMode(p5.CENTER)
        p5.image(fruit, 0, 40, 200, 200)
      } else {
        p5.imageMode(p5.CENTER)
        p5.image(sadElephant, 0, 40, 200, 200)
      }
      if (levelNumber === levels.length - 1) {
        setSettings({
          ...settings,
          ...{ gameState: 'END' }
        })
      } else {
        loadLevel(levelNumber + 1)
      }
    }
  }
  const isLevelFinished = () => {
    if (answered === 'true') {
      return true
    } else {
      return false
    }
  }

  const drawEndScreenDirection = (p5) => {
    p5.image(bodyElephant, 0, 40, 400, 400)
  }

  const preload = (p5) => {
    fruit = p5.loadImage(images.fruit)
    sadElephant = p5.loadImage(images.sadElephant)
    bodyElephant = p5.loadImage(images.bodyElephant)

    loadAllImagesDirection(p5)
  }

  const loadAllImagesDirection = (p5) => {
    for (let i = 0; i < levels.length; i++) {
      imgRight[i] = p5.loadImage(images[levels[i].pictureRight])
      imgWrong[i] = p5.loadImage(images[levels[i].pictureWrong])
    }
  }

  const loadLevel = (levelNumber) => {
    console.log(`loading level ${levelNumber}`)
    setSettings({
      ...DEFAULT_SETTINGS,
      ...{ levelNumber }
    })
  }

  const mousePressed = (p5) => {
    const { gameState } = settings
    const mouseX = p5.mouseX
    const mouseY = p5.mouseY

    if (gameState === 'TRANSITION') {
      return
    }
    if (gameState === 'END') {
      loadLevel(0)
      return
    }

    let odpoved
    if (mouseX < 200 && mouseY > 200) {
      odpoved = 'left'
    } else if (mouseX > 200 && mouseY > 200) {
      odpoved = 'right'
    } else {
      console.log('tady nic není')
    }

    if (odpoved === target) {
      setScore(score + 1)
      result = 'Bingo'
      answered = 'true'
      // vyhra, pokracuj dal. Dostanes ovoce a nacte se novy level
    } else {
      result = 'No'
      answered = 'true'
      // neuhodnul jsi, nic nedostanes a jdes na dalsi level
    }

    console.log(result)
  }

  console.log(` tvoje score je ${score}`)
  return (
    <>
      <Header withElephant={true}/>
      <p>Pravá - Levá</p>
      <Sketch setup={setup} draw={draw} preload={preload} mousePressed={mousePressed} />
    </>
  )
}