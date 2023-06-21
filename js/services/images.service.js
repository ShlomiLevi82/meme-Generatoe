'use strict'

let gImgs = []
let gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'red',
    },
  ],
}

let gKeywordSearchCountMap = { funny: 0, cat: 0, baby: 0 }

createImageList()

function getMeme() {
  return gMeme
}

function createImageList() {
  for (let i = 1; i < 19; i++) {
    let img = {
      id: makeId(),
      url: `/images/meme-imgs (square)/${i}.jpg`,
    }
    gImgs.push(img)
  }
  console.log('gImgs', gImgs)
}

function getImgById(imgId) {
  const img = gImgs.find((img) => imgId === img.id)
  gMeme.selectedImgId = imgId
  return img.url
}

function getTextFromInput(txt) {
  let lineIdx = gMeme.selectedLineIdx
  let str = ''
  str += txt
  console.log('str', str)
  gMeme.lines[lineIdx].txt = str
  console.log('gMeme', gMeme)
  console.log('gMeme.lines[lineIdx].txt', gMeme.lines[lineIdx].txt)
}

function getFontSize() {
  return gMeme.lines[0].size
}

function setFontSize(fontSize) {
  gMeme.lines[0].size = fontSize
}

function makeLine() {
  return {
    txt: '',
    size: 20,
    color: '#000000',
  }
}

function addLine() {
  gMeme.lines.push(makeLine())
}

function selectLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
}

function setLineDrag(isDrag) {
  gIsDrag = isDrag
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
  // setTxtInput(gMeme.lines[gMeme.selectedLineIdx].txt)
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
}
