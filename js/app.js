'use strict'

const gElCanvas = document.querySelector('#canvas')
const gCtx = gElCanvas.getContext('2d')

let gRotatePos
let gResizePos
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
  document.querySelector('.txt-meme').focus()
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
  document.querySelector('.txt-meme').focus()
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
      placeTxt(line, idx, meme.selectedLineIdx)
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

function placeTxt(line, idx, selLineIdx) {
  gCtx.lineWidth = line.outline
  gCtx.strokeStyle = line.colorStroke
  gCtx.fillStyle = line.colorFill
  gCtx.font = `${line.fontSize}px ${line.font}`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.save()
  gCtx.translate(line.x, line.y)
  gCtx.rotate(line.rotate)
  gCtx.fillText(line.txt, 0, 0)
  gCtx.strokeText(line.txt, 0, 0)
  if (selLineIdx === idx) renderTxtBorder(line)
  gCtx.restore()
}

function onAddText(txt) {
  setLineTxt(txt)
  renderMeme()
}

function measureTextWidth(lineIdx) {
  return gCtx.measureText(gMeme.lines[lineIdx].txt).width
}

function renderTxtBorder(line) {
  const width = gCtx.measureText(line.txt).width * 1.2
  const lineHeight = line.fontSize * 1.2
  gCtx.strokeStyle = 'white'
  gCtx.lineWidth = 2

  // Outline selected line
  gCtx.strokeRect(-width / 2, -lineHeight / 2, width, lineHeight)
  // Resize indicator
  gCtx.fillRect(-width / 2 - 5, -line.fontSize / 2 - 3, 7, -7)

  const angle = Math.atan2(-width / 2, -line.fontSize / 2)
  const dist = calcDist(width / 2, line.fontSize / 2, { x: 0, y: 0 })
  // Saving resize indicator location
  gResizePos = {
    x: line.x + dist * Math.sin(angle - line.rotate),
    y: line.y + dist * Math.cos(-angle + line.rotate),
  }

  gCtx.stroke()
  gCtx.beginPath()
  // Rotate indicator
  gCtx.arc(0, -lineHeight * 0.8, 4, Math.PI, 2 * Math.PI)
  gCtx.stroke()

  // Saving rotate indicator location
  gRotatePos = {
    x: line.x + lineHeight * 0.8 * Math.sin(line.rotate),
    y: line.y - lineHeight * 0.8 * Math.cos(line.rotate),
  }
}

function onAddLine() {
  const width = gElCanvas.width / 2
  const height = gElCanvas.height / 2
  addLine(width, height)
  document.querySelector('.txt-meme').focus()
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
