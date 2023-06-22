'use strict'

const gElCanvas = document.querySelector('#canvas')
const gCtx = gElCanvas.getContext('2d')

let gLastPos

function onInit() {
  document.querySelector('.canvas-elements-container').style.display = 'none'
  renderGalery()
  addListeners()
  resizeCanvas()
}

function onShowGallery() {
  onInit()
  document.querySelector('.gallery').style.display = 'flex'
}

function onMakeMeme() {
  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.canvas-elements-container').style.display = 'grid'
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')

  gElCanvas.width = elContainer.offsetWidth - 150
  gElCanvas.height = elContainer.offsetHeight - 150
}

function renderGalery() {
  const elGallery = document.querySelector('.gallery')

  let str = ''
  for (let i = 0; i < gImgs.length; i++) {
    str += `<div class="img-card" onClick="onSelectImg('${gImgs[i].id}')">    
            <img src="/img/${i + 1}.jpg" alt="img${i}" />
           </div>`
  }
  elGallery.innerHTML = str
}

function onSelectImg(imgId) {
  document.querySelector('.canvas-elements-container').style.display = 'grid'
  document.querySelector('.gallery').style.display = 'none'

  resizeCanvas()
  setMeme(imgId)
  addLine(gElCanvas.width / 2, 30)
  renderMeme()
}

function renderMeme() {
  const meme = getMeme()
  const img = new Image()

  img.src = `img/${meme.selectedImgId}.jpg`
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line, idx) => {
      placeTxt(line, idx)
      renderTxtBorder(line, line.x, line.y, line.fontSize)
    })
  }
}

function onSetFontSize(sizeDiff) {
  setFontSize(sizeDiff)
  renderMeme()
}

function onSetClrStroke(color) {
  setColorStroke(color)
  renderMeme()
}

function onSetClrFill(color) {
  setColorFill(color)
  renderMeme()
}

function setSelectedLine(line) {
  document.querySelector('.txt-meme').value = line.txt
  document.querySelector('.clr-stroke').value = line.colorStroke
  document.querySelector('.clr-fill').value = line.colorFill
}

function placeTxt(line) {
  gCtx.lineWidth = 1
  gCtx.strokeStyle = line.colorStroke
  gCtx.fillStyle = line.colorFill
  gCtx.font = `${line.fontSize}px ${line.font}`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.fillText(line.txt, line.x, line.y)
  gCtx.strokeText(line.txt, line.x, line.y)
}

function onAddText(txt) {
  setLineTxt(txt)
  renderMeme()
}

function measureTextWidth(lineIdx) {
  return gCtx.measureText(gMeme.lines[lineIdx].txt).width
}

function renderTxtBorder(txt, x, y, fontSize) {
  let txtSizes = gCtx.measureText(txt)
  console.log('textSizes', txtSizes)
  gCtx.strokeStyle = 'Black'

  let calculatedX = x - txtSizes.width / 2 - 10
  let calculatedY = y - fontSize + 10
  gCtx.strokeRect(calculatedX, calculatedY, txtSizes.width + 25, fontSize + 10)
}

function onAddLine() {
  const width = gElCanvas.width / 2
  const height = gElCanvas.height / 2
  addLine(width, height)
  renderMeme()
}

function onRemoveLine() {
  removeLine()
  renderMeme()
}

function onSaveMeme() {
  saveMeme()
}

function onDownloadImg(elLink) {
  const data = gElCanvas.toDataURL()

  elLink.href = data
  elLink.download = 'my-meme'
}
