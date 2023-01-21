document.addEventListener('DOMContentLoaded', function() {
    var remaining_letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var wrong_guesses = 0
    var score = 0
    word_to_guess = loadDoc()['word']
    
    main()

    function loadDoc() {
        var x
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            x = JSON.parse(this.responseText)
          }
        }
        xhttp.open("POST", "/hangman-endpoint", false)
        xhttp.setRequestHeader("X-CSRFToken", csrftoken)
        xhttp.send(JSON.stringify({'word': true}))
        return x
    }
       
    function main() {
        $(document).ready(function() {
        $('#letters').empty()
        $('#save_name').hide()
        $('.container').hide()
        $('#play_again_btn').hide()
        $('.container_win').hide()
        $('#play_again_win').hide()
        
        writeLetters()
        writeDashedWord(dashWordToGuess(word_to_guess))
        // click on first letter
        $('.letter').click(clickOnLetter)
    })
}

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
        if (isGameOver()) {
            return 1
        }
        writeDashedWord(dashWordToGuess(word_to_guess))
        $('.letter').click(clickOnLetter)
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

    function isGameOver() {
        if (wrong_guesses >= 8) {
            $('#container').hide()
            $('.container').show()
            $('#play_again_btn').show()
            $('#letters').hide()
            $('#display_word').text(word_to_guess)
            $('#display_score').text(score)
            
            fetch('/hangman-endpoint', {
                method: 'POST',
                body: JSON.stringify({
                    word: false,
                    score: score
                }),
                headers: {"X-CSRFToken": csrftoken}
              })
              .then(response => response.json())
              .then(result => {
                  // Print result
                  console.log(result);
                  if (result['high-scores'] == 'yes') {
                    $('#save_name').show()
                    $('#submit_name').click(function() {
                        var submit_name = document.getElementById('submit_input').value
                        fetch('/hangman-leaderboard', {
                            method: 'POST',
                            body: JSON.stringify({
                                name: submit_name,
                                score: score
                            }),
                            headers: {"X-CSRFToken": csrftoken}
                        })
                        .then(response => response.json())
                        .then(result => {
                            console.log(result)
                            window.location.replace("/hangman-leaderboard")
                        })
                    })
                  }
              });

            $('#play_again_btn').click(function() {
                location.reload()
                
            })
        }
        if (dashWordToGuess(word_to_guess).indexOf('-') == -1) {
            $('#container').hide()
            $('.container_win').show()
            $('#play_again_win').show()
            $('#letters').hide()
            $('#display_score_win').text(score)
            $('#play_again_win').click(function() {
                context.clearRect(0, 0, canvas.width, canvas.height)
                word_to_guess = loadDoc()['word']
                wrong_guesses = 0
                remaining_letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
                $('#container').show()
                $('.container_win').hide()
                $('#play_again_win').hide()
                $('#letters').show()
                //$('#display_score_win').text(score)
                //$('#play_again_win')
                main()
            })
        }
    }

})