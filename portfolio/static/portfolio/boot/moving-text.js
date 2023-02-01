var moving_text = document.getElementById('moving_text')
var blinking_cursor = document.getElementById('blinking_cursor')
const text = "<h2>ad astra, et cetera...</h2>"
var idx = 1

setTimeout(writeText, 2000)

setTimeout(function() {
    blinking_cursor.classList.remove('blinking')
}, 2000)


function startWriting() {
    writeText()    
}

function writeText() {
    moving_text.innerText = text.slice(0, idx)

    idx++

    if(idx > text.length) {
        blinking_cursor.classList.add('blinking')
        clearTimeout(myTimeout)
    }

    var myTimeout = setTimeout(writeText, 300)
}