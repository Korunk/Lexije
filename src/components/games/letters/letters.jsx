import React from 'react'
import Sketch from 'react-p5'
import hriste from 'img/hriste.png'
import letterA from 'img/A.png'
import letterU from 'img/U.png'
import letterT from 'img/T.png'
import letterO from 'img/O.png'
import './letters.css'
import { Header } from 'components/header/header'

// create some variables to store our images
let bgImage

// create an empty string to record clicked letters
let lettersClicked = ''

let letterSequence = 0
let mistakes = 0

// simple way to turn the outline on/off
const debugMode = true

// object with the data we need for each letter
const letter = [
  {
    img: null,
    x: 145,
    y: 160,
    radius: 20,
    character: 'A'
  },
  {
    img: null,
    x: 300,
    y: 370,
    radius: 20,
    character: 'U'
  },
  {
    img: null,
    x: 120,
    y: 270,
    radius: 20,
    character: 'T'
  },
  {
    img: null,
    x: 100,
    y: 100,
    radius: 20,
    character: 'O'
  }
]

export const Letters = () => {
  const setup = (p5, canvasParentRef) => {
    // this creates a canvas of a certain size
    p5.createCanvas(400, 400).parent(canvasParentRef)
  }

  const draw = (p5) => {
    const drawLetter = () => {
      // draw the letter at the position
      p5.imageMode(p5.CENTER)

      for (let i = 0; i < letter.length; i++) {
        p5.image(
          letter[i].img,
          letter[i].x,
          letter[i].y,
          letter[i].radius * 2,
          letter[i].radius * 2
        )
      }

      // image(
      //  letter[0].img,
      //  letter[0].x,
      //  letter[0].y,
      //  letter[0].radius * 2,
      //  letter[0].radius * 2,
      // );
      // if debug mode is on, draw the outline around the letter
      if (debugMode === true) {
        p5.noFill()
        p5.stroke(255, 0, 0)
        for (let i = 0; i < letter.length; i++) {
          p5.ellipse(letter[i].x, letter[i].y, letter[i].radius * 2, letter[i].radius * 2)
        }
      }
    }

    // draw the background image
    p5.imageMode(p5.CORNER)
    p5.image(bgImage, 0, 40)

    // call our function that draws the letter
    drawLetter()

    // set some properties for the text we will write on the canvas
    p5.textSize(20)
    p5.noStroke()
    p5.fill(255, 0, 0)

    // display clicked letters
    p5.text(lettersClicked, 20, 20)
  }

  const preload = (p5) => {
    bgImage = p5.loadImage(hriste)

    letter[0].img = p5.loadImage(letterA)
    letter[1].img = p5.loadImage(letterU)
    letter[2].img = p5.loadImage(letterT)
    letter[3].img = p5.loadImage(letterO)
  }

  // runs when the mouse is clicked
  const mousePressed = (p5) => {
  // calculate distance from mouse to center of letter
    const distanceToMouse = p5.floor(p5.dist(p5.mouseX, p5.mouseY, letter[letterSequence].x, letter[letterSequence].y))

    // if distance bigger than radius, player missed
    if (distanceToMouse > letter[letterSequence].radius) {
      console.log('miss')
      mistakes++
      console.log('pocet chyb' + mistakes)
    } else {
      console.log('hit')
      lettersClicked += letter[letterSequence].character
      letterSequence++
    }
  }

  return (
    <>
    <Header withElephant={true}/>
      <p>Hra slova</p>
       <Sketch setup={setup} draw={draw} preload={preload} mousePressed={mousePressed} />;
    </>
  )
}
