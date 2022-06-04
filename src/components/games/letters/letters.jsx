import React, { useState } from 'react'
import Sketch from 'react-p5'
import levels from './levels.json'
import images from './images'
import './letters.css'
import { Header } from 'components/header/header'

const DEFAULT_SETTINGS = {
  lettersClicked: 0,
  mistakes: 0,
  starCount: 5,
  gameReady: false,
  imageCount: 0,
  levelNumber: 0
}

// create some variables to store our images
let bgImage
let star
const letters = {}

export const Letters = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const setup = (p5, canvasParentRef) => {
    // this creates a canvas of a certain size
    p5.createCanvas(400, 400).parent(canvasParentRef)
  }

  const draw = (p5) => {
    const drawLetter = () => {
      // draw the letter at the position
      p5.imageMode(p5.CENTER)

      for (let i = 0; i < levels[settings.levelNumber].letters.length; i++) {
        const letter = levels[settings.levelNumber].letters[i]

        p5.image(
          letters[letter.character],
          letter.x,
          letter.y,
          letter.radius * 2,
          letter.radius * 2
        )
      }
    }

    p5.background(0)
    p5.imageMode(p5.CORNER)
    let x = 200
    for (let i = 0; i < settings.starCount; i++) {
      p5.image(star, x, 5, 20, 20)
      x = x + 30
    }

    p5.image(bgImage, 0, 40)

    // call our function that draws the letter
    drawLetter()

    // set some properties for the text we will write on the canvas
    p5.textSize(20)
    p5.noStroke()
    p5.fill(255, 0, 0)

    // display clicked letters
    p5.text(settings.lettersClicked, 20, 20)
  }

  const preload = (p5) => {
    loadLevel(0, p5)
    star = p5.loadImage(images.star)
  }

  const loadLevel = (level, p5) => {
    setSettings({ ...DEFAULT_SETTINGS, ...{ levelNumber: level } })

    bgImage = p5.loadImage(images[levels[level].background])

    for (let i = 0; i < levels[level].letters.length; i++) {
      const character = levels[level].letters[i].character
      if (character && images[character]) {
        letters[character] = p5.loadImage(images[character])
      }
    }
  }

  // runs when the mouse is clicked
  const mousePressed = (p5) => {
  // calculate distance from mouse to center of letter
    const targetLetter = levels[settings.levelNumber].letters[settings.lettersClicked]

    const distanceToMouse = p5.floor(
      p5.dist(p5.mouseX, p5.mouseY, targetLetter.x, targetLetter.y)
    )

    // if distance bigger than radius, player missed
    if (distanceToMouse > targetLetter.radius) {
      console.log('miss')
      setSettings({ ...settings, ...{ mistakes: settings.mistakes + 1, starCount: settings.starCount - 1 } })
      console.log('pocet chyb' + settings.mistakes)
    } else {
      console.log('hit')
      const lettersClicked = settings.lettersClicked + 1
      setSettings({ ...settings, ...{ lettersClicked } })

      if (lettersClicked === levels[settings.levelNumber].letters.length) {
        console.log(
          'jsi na konci a ted tu chci vymazat vsechny promenne a naplnit je necim novym'
        )

        loadLevel(settings.levelNumber + 1)
      }
    }
  }

  return (
    <>
    <Header withElephant={true}/>
      <p>Hra slova</p>
      <Sketch setup={setup} draw={draw} preload={preload} mousePressed={mousePressed} />
    </>
  )
}
