import React, { useState, useContext } from 'react'
import Sketch from 'react-p5'
import levels from './levels.json'
import images from './images'
import './letters.css'
import { Header } from 'components/header/header'
import { ScoreContext } from 'components/score/score'

const DEFAULT_SETTINGS = {
  levelNumber: 0,
  letterIndex: 0,
  lettersClicked: '',
  starCount: 5,
  debugMode: true,
  gameState: 'PLAYING',
  transitionDuration: 120,
  transitionCountdown: 60
}

// create some variables to store our images
let star, sadElephant, fruit
const letterImages = {}
const bgImages = {}

export const Letters = () => {
  const { score, setScore } = useContext(ScoreContext)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const preload = (p5) => {
    star = p5.loadImage(images.star)
    fruit = p5.loadImage(images.fruit)
    sadElephant = p5.loadImage(images.sadElephant)

    loadAllImages(p5)
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

    setSettings({
      ...DEFAULT_SETTINGS,
      ...{ levelNumber }
    })
  }

  const setup = (p5, canvasParentRef) => {
    // this creates a canvas of a certain size
    p5.createCanvas(400, 440).parent(canvasParentRef)
    p5.textFont('Patrick Hand')
  }

  const draw = (p5) => {
    const { gameState } = settings

    p5.background('#fae2e220')

    // set p5 to draw images using (x,y) as corner
    p5.imageMode(p5.CORNER)

    drawStars(p5)
    drawLettersClicked(p5)
    drawTargetWord(p5)

    switch (gameState) {
      case 'PLAYING':
        drawPlayScreen(p5)
        break
      case 'TRANSITION':
        drawTransitionScreen(p5)
        break
    }
  }

  const drawPlayScreen = (p5) => {
    const { levelNumber, transitionDuration } = settings

    p5.image(bgImages[levelNumber], 0, 40)

    drawLetters(p5)

    if (isLevelFinished()) {
      setSettings({
        ...settings,
        ...{ transitionCountdown: transitionDuration },
        ...{ gameState: 'TRANSITION' }
      })
    }
  }

  const drawTransitionScreen = (p5) => {
    const { transitionCountdown, levelNumber, starCount } = settings

    if (transitionCountdown > 0) {
      setSettings({
        ...settings,
        ...{ transitionCountdown: transitionCountdown - 1 }
      })

      if (starCount > 0) {
        p5.image(fruit, 0, 40, 400, 400)
        setScore({ fruits: score.fruits.concat(['banana']) })
      } else {
        p5.image(sadElephant, 0, 40, 400, 400)
      }
    } else {
      if (starCount > 0) {
        loadLevel(levelNumber + 1)
      } else {
        loadLevel(levelNumber)
      }
    }
  }

  const isLevelFinished = () => {
    const { levelNumber, letterIndex, starCount } = settings
    const { letters } = levels[levelNumber]

    const playerClickedAllLetters = (letterIndex === letters.length)
    const playerLostAllStars = (starCount === 0)

    if (playerClickedAllLetters || playerLostAllStars) {
      return true
    } else {
      return false
    }
  }

  const drawStars = (p5) => {
    const { starCount } = settings
    let starX = 380
    const starY = 5

    for (let i = 0; i < starCount; i++) {
      p5.image(star, starX, starY, 20, 20)
      starX = starX - 30
    }
  }

  const drawLetters = (p5) => {
    // set p5 to draw images using (x,y) as center
    p5.imageMode(p5.CENTER)

    const { levelNumber, debugMode } = settings
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

      if (debugMode === true) {
        p5.stroke(0, 255, 0)
        p5.fill(255, 0, 255, 128)
        p5.ellipse(
          letter.x,
          letter.y,
          letter.radius * 2,
          letter.radius * 2
        )
      }
    }
  }

  const drawTargetWord = (p5) => {
    const { levelNumber } = settings
    const { word } = levels[levelNumber]

    // set some properties for the text we will write on the canvas
    p5.textSize(20)
    p5.noStroke()
    p5.fill(255, 0, 0)

    // display target letter
    p5.text(`${word}`, 20, 20)
  }

  const drawLettersClicked = (p5) => {
    // set some properties for the text we will write on the canvas
    p5.textSize(30)
    p5.noStroke()
    p5.fill(0, 0, 255)

    // display clicked letters
    p5.text(settings.lettersClicked, 150, 30)
  }

  // runs when the mouse is clicked
  const mousePressed = (p5) => {
    const { levelNumber, letterIndex, gameState } = settings

    if (gameState !== 'PLAYING') {
      return
    }

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
    setSettings({
      ...settings,
      ...{ starCount: settings.starCount - 1 }
    })

    console.log(`pocet chyb ${settings.starCount - 5}`)
  }

  const increaseWord = () => {
    const { levelNumber, letterIndex } = settings
    const { letters } = levels[levelNumber]
    const targetLetter = letters[letterIndex]

    const lettersClicked = settings.lettersClicked + targetLetter.character

    setSettings({
      ...settings,
      ...{ lettersClicked },
      ...{ letterIndex: letterIndex + 1 }
    })
  }

  return (
    <>
    <Header withElephant={true}/>
      <p>Hra slova</p>
      <Sketch setup={setup} draw={draw} preload={preload} mousePressed={mousePressed} />
    </>
  )
}
