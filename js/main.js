'use strict'

function onInit() {
  document.querySelector('.canvas-container').style.display = 'none'
  renderGalery()
  initCanvas()
  addListeners()
}

function renderGalery() {
  const elGallery = document.querySelector('.gallery')

  let str = ''
  for (let i = 0; i < gImgs.length; i++) {
    str += `<div class="img-card" onClick="onSelectImg('${gImgs[i].id}')">    
            <img src="/images/meme-imgs (square)/${i + 1}.jpg" alt="img${i}" />
           </div>`
  }
  elGallery.innerHTML = str
}

function onSelectImg(picId) {
  const img = new Image()
  img.src = getImgById(picId)
  setMeme(picId)
  onMakeMeme()
  renderImg(img)
}

function onShowGallery() {
  document.querySelector('.gallery').style.display = 'flex'
  document.querySelector('.canvas-container').style.display = 'none'
}

function onMakeMeme() {
  document.querySelector('.gallery').style.display = 'none'
  document.querySelector('.canvas-container').style.display = 'block'
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  renderMeme()
}

function onAddText() {
  let text = document.querySelector('.txt-meme').value

  getTextFromInput(text)
  renderMeme()
}

function renderCanvas() {
  //Set the backgournd color to grey
  gCtx.fillStyle = '#ede5ff'
  //Clear the canvas,  fill it with grey background
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = function (event) {
    let img = new Image()
    img.src = event.target.result
    img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0])
}

function onIncreaseFontSize() {
  let fontSize = getFontSize()
  fontSize += 5
  setFontSize(fontSize)
  console.log('fontSize', fontSize)
}

function onDecreaseFontSize() {
  let fontSize = getFontSize()
  fontSize -= 5
  setFontSize(fontSize)
  console.log('fontSize', fontSize)
}

function onAddLine() {
  const width = gElCanvas.width / 2
  const height = gElCanvas.height / 2
  addLine(width, height)

  renderMeme()
}
