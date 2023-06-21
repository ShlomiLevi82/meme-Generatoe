'use strict'

let gImgs = []
let gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel', //Default value:
      size: 20,
      color: 'red',
      x: 0,
      y: 0,
    },
  ],
}

let gKeywordSearchCountMap = { funny: 0, cat: 0, baby: 0 }

createImageList()

function getMeme() {
  return gMeme
}

function setMeme(imgId) {
  gMeme.selectedImgId = imgId
}

function getImgById(imgId) {
  const img = gImgs.find((img) => imgId === img.id)
  gMeme.selectedImgId = imgId
  return img.url
}

function getTextFromInput(txt) {
  gMeme.lines[0].txt = txt
  //   gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getFontSize() {
  return gMeme.lines[0].size
  //   return gMeme.lines[gMeme.selectedLineIdx].size
}

function setFontSize(fontSize) {
  gMeme.lines[0].size = fontSize
  //   gMeme.lines[gMeme.selectedLineIdx].size = fontSize
}

function createLine(x, y) {
  return {
    txt: 'Writ a line',
    size: 25,
    color: '#000000',
    x,
    y,
  }
}

function addLine(x, y) {
  if (gMeme.lines.length === 1) y = y * 2 - 40
  gMeme.lines.push(createLine(x, y))

  selectLine(gMeme.lines.length - 1)
}

function selectLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
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

function moveLine(dx, dy) {
  gMeme.lines[0].x += dx
  gMeme.lines[0].y += dy
  //   gMeme.lines[gMeme.selectedLineIdx].x += dx
  //   gMeme.lines[gMeme.selectedLineIdx].y += dy
  console.log('dx', dx)
  console.log('dy', dy)
}

function measureTextWidth(lineIdx) {
  return gCtx.measureText(gMeme.lines[0].txt).width
  //   return gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
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
