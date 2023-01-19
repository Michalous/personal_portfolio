document.addEventListener('DOMContentLoaded', function() {
    var remaining_letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var wrong_guesses = 0
    var score = 0
    var word_to_guess = $('#secret_word').text()
    
    

    $(document).ready(function() {
        writeLetters()
        writeDashedWord(dashWordToGuess(word_to_guess))
        // click on first letter
        $('.letter').click(clickOnLetter)
        
        $.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word_to_guess}`, function(data, status){
            console.log(data)
        });
        

    })

    function writeLetters() {
        for (var i = 0; i < remaining_letters.length; i++) {
            var content = $('<div class="letter"></div>').text(remaining_letters[i])
            $('#letters').append(content)
        }
    }

    function clickOnLetter() {
        var clickedLetter = $(this).text()
        console.log(clickedLetter)
        increaseScore(clickedLetter)
        $('#yourScore').text(score)
        var index = remaining_letters.indexOf(clickedLetter)
        remaining_letters.splice(index, 1)
        if (word_to_guess.indexOf(clickedLetter) == - 1) {
            wrong_guesses++
        }
        $('#letters').empty()
        writeLetters()
        drawHangman()
        writeDashedWord(dashWordToGuess(word_to_guess))
        $('.letter').click(clickOnLetter)
        console.log(score)
    }

    function drawHangman() {
        for (var i = 0; i <= wrong_guesses; i++) {
            Draw(draws[i])
        }
    }

    function dashWordToGuess(word) {
        var returnWord = []
        for (var i = 0; i < word.length; i++) {
            returnWord.push('-')
        }
        for (var i = 0; i < word.length; i++) {
            if (remaining_letters.indexOf(word[i]) == -1) {
                returnWord[i] = word[i]
            }
        }
        return returnWord
    }

    function writeDashedWord(word) {
        $('#dashedWord').empty()
        for (var i = 0; i < word.length; i++) {
            var content = $('<div class="letter_dash"></div>').text(word[i])
            $('#dashedWord').append(content)
        }
    }

    function increaseScore(letter) {
        for (var i = 0; i < word_to_guess.length; i++) {
            if (letter == word_to_guess[i]) {
                score += SCRABBLE_LETTER_VALUES[letter]
            }
        }
    }
})