import React, { useState, useContext } from 'react'
import Sketch from 'react-p5'
import { Header } from 'components/header/header'
import './directions.css'
import levels from './levels.json'
import images from './images'
import { AppContext } from 'components/app/app'

const DEFAULT_SETTINGS = {
  levelNumber: 0,
  gameState: 'PLAYING',
  transitionDuration: 120,
  transitionCountDouwn: 60,
  debugMode: false
}

let sadElephant, fruit, bodyElephant
let answered = false
const imgWrong = {}
const imgRight = {}

const leftImage = { x: 100, y: 340 }
const rightImage = { x: 300, y: 340 }

let result

export const Directions = () => {
  const { status, setStatus } = useContext(AppContext)
  const [target, setTarget] = useState('')
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

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

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 440).parent(canvasParentRef)
    p5.background('#fae2e2')

    loadLevel(0)
  }

  const loadLevel = (levelNumber) => {
    answered = false
    console.log(`loading level ${levelNumber}`)

    // this needs to be done for each level
    const randomNumber = Math.random()

    setTarget(randomNumber < 0.5 ? 'left' : 'right')
    console.log({ target })

    setSettings({
      ...DEFAULT_SETTINGS,
      ...{ levelNumber }
    })
  }

  const draw = (p5) => {
    const { gameState } = settings
    p5.background('#fae2e230')

    switch (gameState) {
      case 'PLAYING':
        drawPlayScreen(p5)
        break
      case 'TRANSITION':
        drawTransitionScreen(p5)
        break
      case 'END':
        drawEndScreen(p5)
        break
    }
  }

  const drawPlayScreen = (p5) => {
    const { levelNumber, transitionDuration, debugMode } = settings

    const levelPictureRight = imgRight[levelNumber]
    const levelPictureWrong = imgWrong[levelNumber]

    p5.background('#fae2e2')
    p5.imageMode(p5.CENTER)

    p5.image(levelPictureRight, 200, 140, 100, 100) // obrazek, ktery chci hledat
    // vygeneruji si dva obrázky, podle proměnné target, která mi říká, kde má být odpověď

    p5.stroke(0)
    p5.strokeWeight(4)
    p5.line(0, 240, 400, 240)

    if (target === 'left') {
      p5.image(levelPictureRight, leftImage.x, leftImage.y, 100, 100) // obrázek s odpovědí
      p5.image(levelPictureWrong, rightImage.x, rightImage.y, 100, 100) // druhý obrázek
    } else {
      p5.image(levelPictureWrong, leftImage.x, leftImage.y, 100, 100) // druhý obrázek
      p5.image(levelPictureRight, rightImage.x, rightImage.y, 100, 100) // obrázek s odpovědí
    }

    if (debugMode) {
      p5.noFill()
      p5.rect(0, 0, p5.width, p5.height)
      p5.ellipse(leftImage.x, leftImage.y, 100, 100)
      p5.ellipse(rightImage.x, rightImage.y, 100, 100)
    }

    if (isLevelFinished()) {
      setSettings({
        ...settings,
        ...{ transitionCountdown: transitionDuration },
        ...{ gameState: 'TRANSITION' }
      })
    }
  }

  const isLevelFinished = () => {
    if (answered === true) {
      return true
    } else {
      return false
    }
  }

  const drawTransitionScreen = (p5) => {
    const { transitionCountdown, levelNumber } = settings
    p5.imageMode(p5.CORNER)

    if (transitionCountdown > 0) {
      setSettings({
        ...settings,
        ...{ transitionCountdown: transitionCountdown - 1 }
      })

      if (result === 'Bingo') {
        p5.image(fruit, 0, 40, 400, 400)
      } else {
        p5.image(sadElephant, 0, 40, 400, 400)
      }
    } else {
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

  const drawEndScreen = (p5) => {
    p5.imageMode(p5.CORNER)
    p5.image(bodyElephant, 0, 40, 400, 400)
  }

  const mouseClicked = (p5) => {
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

    const distanceToLeftImage = p5.floor(
      p5.dist(mouseX, mouseY, leftImage.x, leftImage.y)
    )

    const distanceToRightImage = p5.floor(
      p5.dist(mouseX, mouseY, rightImage.x, rightImage.y)
    )

    let odpoved = null

    if (distanceToLeftImage < 50) {
      odpoved = 'left'
      console.log('clicked left')
    } else if (distanceToRightImage < 50) {
      odpoved = 'right'
      console.log('clicked right')
    } else {
      console.log('missed')
    }

    if (odpoved === null) {
      return
    }

    answered = true

    if (odpoved === target) {
      setStatus({ ...status, ...{ fruits: status.fruits.concat(['banana']) } })
      result = 'Bingo'
      // vyhra, pokracuj dal. Dostanes ovoce a nacte se novy level
    } else {
      result = 'No'
      // neuhodnul jsi, nic nedostanes a jdes na dalsi level
    }

    console.log(result)
  }

  return (
    <>
      <Header withElephant={true}/>
      <p>Pravá - Levá</p>
      <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked} />
    </>
  )
}
