'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', resizeCanvas)
  // gElCanvas.addEventListener('click',draw())
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

  findLineIdx(pos)

  // const {line} = getMeme()

  // document.querySelector('.line-txt').value = getSelectedTxt()

  setLineDrag(true)

  gLastPos = pos

  document.body.style.cursor = 'grabbing'
  renderMeme()
}

function onMove(ev) {
  const isDrag = getIsDrag()
  if (!isDrag) return
  // console.log('Moving the line')

  const pos = getEvPos(ev)
  // Calc the delta, the diff we moved
  const dx = pos.x - gLastPos.x
  const dy = pos.y - gLastPos.y
  moveLine(dx, dy)
  // Save the last pos, we remember where we`ve been and move accordingly
  gLastPos = pos
  // The canvas is render again after every move
  renderMeme()
}

function onUp() {
  setLineDrag(false)

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
