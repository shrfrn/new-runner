'use strict'
var gIsMark = false
var gTimeoutId

function onInit() {
    setTimeout(() => {
        const elTitle = document.querySelector('h1')
        elTitle.innerText = 'I Love JS'
    }, 3000)
}

function onMark(elBtn) {
    gIsMark = !gIsMark
    const elSpans = document.querySelectorAll('.box span')
    for (var i = 0; i < elSpans.length; i++) {
        const elSpan = elSpans[i]
        elSpan.classList.toggle('mark')
    }

    elBtn.innerText = gIsMark ? 'Unmark' : 'Mark'
}

function onMouseEnter(elImg) {
    elImg.src = 'img/ca.png'
}

function onMouseLeave(elImg) {
    elImg.src = 'img/ninja.png'
}

function onImgClicked() {
    onBless()
}

function onChangeSubHeader(elSpan) {
    if (!gIsMark) return
    var elH2Span = document.querySelector('h2 span')
    elH2Span.innerText = elSpan.innerText
}

function onHandleKey(ev) {
    if (ev.key === 'Escape') onCloseModal()
}

function openModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')

    if (gTimeoutId) clearTimeout(gTimeoutId)

    gTimeoutId = setTimeout(onCloseModal, 5000)
}

function onCloseModal() {
    gTimeoutId = undefined

    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

function onBless() {
    const elModal = document.querySelector('.modal')
    const elModalH2 = elModal.querySelector('h2')

    elModalH2.innerText = 'You were blessed at ' + getTime()
    elModalH2.style.color = getRandomColor()

    openModal()
}


function getTime() {
    return new Date().toString().split(' ')[4]
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

