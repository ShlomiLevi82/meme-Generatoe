'use strict'

var gIsDrag = false

function renderMeme() {
  const meme = getMeme()
  const img = new Image()

  img.src = getImgById(gMeme.selectedImgId)
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line, idx) => {
      drawText(line, idx)
    })
  }
}

function drawText(text) {
  let fontSize = getFontSize()
  gCtx.strokeStyle = getStrokeColor()
  gCtx.fillStyle = getFillColor()
  gCtx.lineWidth = 1
  gCtx.font = fontSize + 'px Arial'
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, gElCanvas.width / 2, 50)
  gCtx.strokeText(text, gElCanvas.width / 2, 50)
}

function getStrokeColor() {
  let strokColor = document.getElementById('stroke-color').value

  return strokColor
}
function getFillColor() {
  let fillColor = document.querySelector('.clr-fill').value

  return fillColor
}

function getIsDrag() {
  return gIsDrag
}
