'use strict'

const KEY = 'meme-key'

let gImgs = []
let gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [],
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
  console.log('gImgs', gImgs)
}

function setMeme(imgId) {
  gMeme.selectedImgId = imgId
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

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
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

  selectLine(lineIdx)
}

function selectLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
  setSelectedLine(gMeme.lines[gMeme.selectedLineIdx])
}

function setLineDrag(isDrag) {
  gIsDrag = isDrag
}

function getIsDrag() {
  return gIsDrag
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function getSelectedTxt() {
  return gMeme.lines[gMeme.selectedLineIdx].txt
}

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
