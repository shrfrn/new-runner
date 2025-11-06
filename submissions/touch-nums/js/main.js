'use strict'

const audioWin = new Audio('audio/tada.mp3')

var gNums
var gCurrNum
var gIntervalId
var gLevel = 9

function onInit() {
  gCurrNum = 1

  document.querySelector('.timer').innerText = '00 : 000'
  document.querySelector('h2 span').innerText = gCurrNum
  
  if (gIntervalId) clearInterval(gIntervalId)
  
  generateNums(gLevel)
  renderBoard()
  showTable()
}

function generateNums(level) {
  gNums = []
  for (var i = 0; i < level; i++) {
    gNums[i] = i + 1
  }
  shuffle(gNums)
}

function renderBoard() {
  const nums = gNums.slice()
  var strHTML = ``
  for (var i = 0; i < Math.sqrt(gNums.length); i++) { 
    strHTML += `<tr>`
    for (var j = 0; j < Math.sqrt(gNums.length); j++) {
      const currNum = nums.pop()
      strHTML += `<td>
                    <button onclick="onCellClicked(this, ${currNum})">
                      ${currNum}
                    </button>
                  </td>`
    }
    strHTML += `</tr>`
  }

  const elTable = document.querySelector('.board-container table')
  elTable.innerHTML = strHTML
}

function onCellClicked(elCell, clickedNum) {
  if (clickedNum !== gCurrNum) return

  if (clickedNum === 1) {
    startTimer()
  } else if (clickedNum === gNums.length) {
    handleVictory()
    return
  }
  gCurrNum++
  document.querySelector('h2 span').innerText = gCurrNum
  elCell.classList.add('clicked')
}

function handleVictory() {
  audioWin.play()
  clearInterval(gIntervalId)
  showModal()
}

function onSetLevel(level) {
  gLevel = level
  onInit()
}

function startTimer() {
  const elTimer = document.querySelector('.timer')
  const startTime = Date.now()

  gIntervalId = setInterval(() => {
    const timeDiff = Date.now() - startTime
    const timePassed = getFormatedTimePassed(timeDiff)
    elTimer.innerText = timePassed
  }, 10)
}

function showModal() {
  const elBoardContainer = document.querySelector('.board-container')
  elBoardContainer.style.display = 'none'
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'initial'
}

function showTable() {
  const elBoardContainer = document.querySelector('.board-container')
  elBoardContainer.style.display = 'initial'
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}