function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
        const idx = Math.floor(Math.random() * (i + 1))
        const temp = items[i]
        items[i] = items[idx]
        items[idx] = temp
    }
}

function getFormatedTimePassed(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000)
    const milliSeconds = ((timeDiff - seconds * 1000) + '').padStart(3, '0')
    return `${(seconds +'').padStart(2, '0')} : ${milliSeconds}`
  }
  

