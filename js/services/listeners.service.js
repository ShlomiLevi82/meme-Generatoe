'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    resizeCanvas()

    renderMeme()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)

  // checking what user clicked
  if (calcDist(pos.x, pos.y, gRotatePos) < 10) {
    setRotateMode(true)
  } else if (calcDist(pos.x, pos.y, gResizePos) < 10) {
    setResizeMode(true)
  } else if (findLineIdx(pos)) {
    setLineDrag(true)
    gLastPos = pos
  } else deselect()
  document.body.style.cursor = 'grabbing'
  renderMeme()
}

function onMove(ev) {
  const pos = getEvPos(ev)
  // Drag rotate or resize
  if (getIsRotate()) {
    rotateLine(pos.x, pos.y)
  } else if (getIsResize()) {
    resizeLine(pos.x, pos.y, gResizePos)
  } else if (getIsDrag()) {
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y
    moveLine(dx, dy)
    gLastPos = pos
  }
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  setResizeMode(false)
  setRotateMode(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
