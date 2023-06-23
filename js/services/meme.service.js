'use strict'

const KEY = 'meme-key'

let gImgs = []
let gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [],
}

let gChang = {
  isRotate: false,
  isDrag: false,
  isResize: false,
}

let gIsDrag = false
let gSavedMemes = loadMemes()

createImageList()
function createImageList() {
  for (let i = 1; i < 19; i++) {
    let img = {
      id: i,
      url: `img/${i}.jpg`,
    }
    gImgs.push(img)
  }
}

function createLine(x, y) {
  return {
    txt: 'write something',
    size: 25,
    colorFill: '#c2c2c2',
    colorStroke: '#ffffff',
    font: 'arial',
    fontSize: 30,
    x,
    y,
    data: '',
  }
}

function addLine(x, y) {
  if (gMeme.lines.length === 1) y = y * 2 - 50
  gMeme.lines.push(createLine(x, y))
  selectLine(gMeme.lines.length - 1)
}

function removeLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function findLineIdx({ x, y }) {
  const lineIdx = gMeme.lines.findIndex((line, lineIdx) => {
    const txtWidth = measureTextWidth(lineIdx)
    return (
      x >= line.x - txtWidth / 2 &&
      x <= line.x + txtWidth / 2 &&
      y >= line.y - line.fontSize / 2 &&
      y <= line.y + line.fontSize / 2
    )
  })
  if (lineIdx !== -1) {
    selectLine(lineIdx)
    return true
  }
}

function selectLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
  setSelectedLine(gMeme.lines[gMeme.selectedLineIdx])
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function rotateLine(x, y) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.rotate = Math.atan2(x - line.x, line.y - y)
}

function editMeme(idx) {
  gMeme = gSavedMemes[idx]
}

function loadMemes() {
  let memes = loadFromStorage(KEY)
  if (!memes) memes = []
  return memes
}

function saveMeme() {
  gMeme.data = gElCanvas.toDataURL()
  gSavedMemes.push(gMeme)
  saveToStorage(KEY, gSavedMemes)
}

function resizeBox(x, y, resizePos) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  const dx = x - resizePos.x
  const dy = y - resizePos.y

  const prevFSize = line.fontSize
  // Measuring change in both axes and averaging
  const yFSize = line.fontSize - dy
  const xFSize =
    line.fontSize * (1 - (2 * dx) / measureTextWidth(gMeme.selectedLineIdx))
  const newSize = (yFSize + xFSize) / 2

  // Limiting font size
  if (newSize > 100) line.fontSize = 100
  else if (newSize < 25) line.fontSize = 25
  else line.fontSize = newSize
}

function deselect() {
  gMeme.selectedLineIdx = -1
}

// ------------SET------------------

function setFontSize(sizeDiff) {
  const line = gMeme.lines[gMeme.selectedLineIdx]

  line.fontSize += sizeDiff
  if (line.fontSize >= 80 || line.fontSize <= 20) line.fontSize -= sizeDiff
}

function setColorStroke(color) {
  gMeme.lines[gMeme.selectedLineIdx].colorStroke = color
}

function setColorFill(color) {
  gMeme.lines[gMeme.selectedLineIdx].colorFill = color
}

function setLineDrag(isDrag) {
  gChang.isDrag = isDrag
}

function setResizeMode(isResize) {
  gChang.isResize = isResize
}

function setRotateMode(isRotate) {
  gChang.isRotate = isRotate
}

function setMeme(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

// ------------GET------------------

function getSelectedTxt() {
  return gMeme.lines[gMeme.selectedLineIdx].txt
}

function getIsRotate() {
  return gChang.isRotate
}

function getIsResize() {
  return gChang.isResize
}

function getIsDrag() {
  return gChang.isDrag
}

function getIsDrag() {
  return gChang.isDrag
}

function getIsResize() {
  return gChang.isResize
}

function getIsRotate() {
  return gChang.isRotate
}

function getMeme() {
  return gMeme
}

function getSavedMemes() {
  return gSavedMemes
}

function getImages() {
  return gImgs
}
