import React, { useState } from 'react'
import Sketch from 'react-p5'
import levels from './levels.json'
import images from './images'
import './letters.css'

const DEFAULT_SETTINGS = {
  levelNumber: 0,
  letterIndex: 0,
  lettersClicked: '',
  starCount: 5
}

// create some variables to store our images
let star
const letterImages = {}
const bgImages = {}

export const Letters = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const preload = (p5) => {
    star = p5.loadImage(images.star)
    loadAllImages(p5)
    loadLevel(settings.levelNumber)
  }

  const loadAllImages = (p5) => {
    for (let i = 0; i < levels.length; i++) {
      const { letters } = levels[i]
      const backgroundUrl = images[levels[i].background]

      bgImages[i] = p5.loadImage(backgroundUrl)

      for (let j = 0; j < letters.length; j++) {
        const character = letters[j].character

        if (character && images[character]) {
          letterImages[character] = p5.loadImage(images[character])
        }
      }
    }
  }

  const loadLevel = (levelNumber) => {
    console.log(`loading level ${levelNumber}`)
    setSettings({ ...DEFAULT_SETTINGS, ...{ levelNumber } })
  }

  const setup = (p5, canvasParentRef) => {
    // this creates a canvas of a certain size
    p5.createCanvas(400, 440).parent(canvasParentRef)
  }

  const draw = (p5) => {
    const { levelNumber } = settings

    p5.background('#fae2e2')

    // set p5 to draw images using (x,y) as corner
    p5.imageMode(p5.CORNER)
    p5.image(bgImages[levelNumber], 0, 40)

    drawStars(p5)
    drawLetters(p5)
    drawLettersClicked(p5)

    if (isLevelFinished()) {
      loadLevel(settings.levelNumber + 1)
    }
  }

  const isLevelFinished = () => {
    const { levelNumber, letterIndex } = settings
    const { letters } = levels[levelNumber]

    if (letterIndex === letters.length) {
      return true
    } else {
      return false
    }
  }

  const drawStars = (p5) => {
    const { starCount } = settings
    let starX = 200
    const starY = 5

    for (let i = 0; i < starCount; i++) {
      p5.image(star, starX, starY, 20, 20)
      starX = starX + 30
    }
  }

  const drawLetters = (p5) => {
    // set p5 to draw images using (x,y) as center
    p5.imageMode(p5.CENTER)

    const { levelNumber } = settings
    const level = levels[levelNumber]

    for (let i = 0; i < level.letters.length; i++) {
      const letter = level.letters[i]
      const letterImage = letterImages[letter.character]

      p5.image(
        letterImage,
        letter.x,
        letter.y,
        letter.radius * 2,
        letter.radius * 2
      )
    }
  }

  const drawLettersClicked = (p5) => {
    // set some properties for the text we will write on the canvas
    p5.textSize(20)
    p5.noStroke()
    p5.fill(255, 0, 0)

    // display clicked letters
    p5.text(settings.lettersClicked, 20, 20)
  }

  // runs when the mouse is clicked
  const mousePressed = (p5) => {
    const { levelNumber, letterIndex } = settings
    const { letters } = levels[levelNumber]
    const targetLetter = letters[letterIndex]

    const distanceToMouse = p5.floor(
      p5.dist(p5.mouseX, p5.mouseY, targetLetter.x, targetLetter.y)
    )

    // if distance bigger than radius, player missed
    if (distanceToMouse > targetLetter.radius) {
      console.log('miss')
      decreaseStars()
    } else {
      console.log('hit')
      increaseWord()
    }
  }

  const decreaseStars = () => {
    setSettings({ ...settings, ...{ starCount: settings.starCount - 1 } })
    console.log(`pocet chyb ${settings.starCount - 5}`)
  }

  const increaseWord = () => {
    const { levelNumber, letterIndex } = settings
    const { letters } = levels[levelNumber]
    const targetLetter = letters[letterIndex]

    const lettersClicked = settings.lettersClicked + targetLetter.character
    setSettings({ ...settings, ...{ lettersClicked }, ...{ letterIndex: letterIndex + 1 } })
  }

  return (
    <>
      <p>Hra slova</p>
      <Sketch setup={setup} draw={draw} preload={preload} mousePressed={mousePressed} />
    </>
  )
}
