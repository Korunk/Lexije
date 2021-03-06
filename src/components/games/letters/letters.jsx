import React, { useState, useContext } from 'react'
import Sketch from 'react-p5'
import levels from './levels.json'
import images from './images'
import './letters.css'
import { AppContext } from 'components/app/app'

const DEFAULT_SETTINGS = {
  levelNumber: 0,
  letterIndex: 0,
  lettersClicked: '',
  starCount: 5,
  debugMode: false,
  gameState: 'PLAYING',
  transitionDuration: 120,
  transitionCountdown: 60,
  targetScale: 1.5
}

// create some variables to store our images
let star, sadElephant, fruit, bodyElephant
const letterImages = {}
const bgImages = {}

export const Letters = () => {
  const { status, setStatus } = useContext(AppContext)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const preload = (p5) => {
    star = p5.loadImage(images.star)
    fruit = p5.loadImage(images.fruit)
    sadElephant = p5.loadImage(images.sadElephant)
    bodyElephant = p5.loadImage(images.bodyElephant)

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
    p5.createCanvas(400, 430).parent(canvasParentRef)
    p5.textFont('Patrick Hand')
    p5.background('#fae2e2')
  }

  const draw = (p5) => {
    const { gameState } = settings

    p5.background('#fae2e230')

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
      case 'END':
        drawEndScreen(p5)
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
        p5.image(fruit, 100, 100, 200, 200)
      } else {
        p5.image(sadElephant, 0, 40, 370, 370)
      }
    } else {
      // podminka jestli jsem na konci nebo pokracuju na dalsi level
      if (levelNumber === levels.length - 1) {
        setSettings({
          ...settings,
          ...{ gameState: 'END' }
        })
      } else {
        if (starCount > 0) {
          loadLevel(levelNumber + 1)
        } else {
          loadLevel(levelNumber)
        }
      }
    }
  }

  const drawEndScreen = (p5) => {
    p5.image(bodyElephant, 0, 40, 370, 370)
  }

  const isLevelFinished = () => {
    const { levelNumber, letterIndex, starCount } = settings
    const { letters } = levels[levelNumber]

    const playerClickedAllLetters = (letterIndex === letters.length)
    const playerLostAllStars = (starCount === 0)

    if (playerClickedAllLetters) {
      setStatus({ ...status, ...{ fruits: status.fruits.concat(['banana']) } })
    }

    if (playerClickedAllLetters || playerLostAllStars) {
      return true
    } else {
      return false
    }
  }

  const drawStars = (p5) => {
    const { starCount } = settings
    let starX = 378
    const starY = 5

    for (let i = 0; i < starCount; i++) {
      p5.image(star, starX, starY, 20, 20)
      starX = starX - 30
    }
  }

  const drawLetters = (p5) => {
    // set p5 to draw images using (x,y) as center
    p5.imageMode(p5.CENTER)
    const { levelNumber, debugMode, targetScale } = settings
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
        const circleWidth = (letter.radius * 2) * targetScale

        p5.stroke(0, 255, 0)
        p5.fill(255, 0, 255, 128)
        p5.ellipse(
          letter.x,
          letter.y,
          circleWidth,
          circleWidth
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
    p5.fill(0, 0, 0)

    // display target letter
    p5.text(`${word}`, 20, 20)
  }

  const drawLettersClicked = (p5) => {
    // set some properties for the text we will write on the canvas
    p5.textSize(30)
    p5.noStroke()
    p5.fill(0, 0, 0)

    // display clicked letters
    p5.text(settings.lettersClicked, 150, 20)
  }

  // runs when the mouse is clicked
  const mouseClicked = (p5) => {
    const { levelNumber, letterIndex, gameState, targetScale } = settings

    if (gameState === 'TRANSITION') {
      return
    }
    if (gameState === 'END') {
      loadLevel(0)
      return
    }

    const { mouseX, mouseY } = p5

    // here you should check if mouseX and mouseY are inside the canvas
    // if it is not, return and dont continue with the function
    if (mouseX < 0 || mouseX > 400 || mouseY < 40 || mouseY > 440) {
      return
    }

    const { letters } = levels[levelNumber]
    const targetLetter = letters[letterIndex]

    const targetRadius = targetLetter.radius * targetScale

    const distanceToMouse = p5.floor(
      p5.dist(mouseX, mouseY, targetLetter.x, targetLetter.y)
    )

    // if distance bigger than radius, player missed
    if (distanceToMouse > targetRadius) {
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
      <h2 className='letters'>Najdi p??smenka a poskl??dej slovo:</h2>
      <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked} />
    </>
  )
}
