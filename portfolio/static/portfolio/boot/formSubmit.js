document.addEventListener('DOMContentLoaded', function() {
    var contactForm_submit_button = document.getElementById('contactForm_submit_button')
    var formEmail = document.getElementById('formEmail')
    var textarea = document.getElementById('textarea')

    contactForm_submit_button.addEventListener('click', function(event) {
        event.preventDefault()
        ValidateEmail(formEmail)
    })

    function ValidateEmail(inputText) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(inputText.value.match(mailformat)) {
            fetch('', {
                method: 'POST',
                body: JSON.stringify({
                    email: formEmail.value,
                    query: textarea.value
                }),
                headers: {"X-CSRFToken": csrftoken}
              })
              .then(response => response.json())
              .then(result => {
                  console.log(result)
                  formEmail.value = ""
                  textarea.value = ""
                  alert("Thank you, we've received your query and respond as soon as possible.")
              })
            return true;
        }
        else {
            alert("You have entered an invalid email address!");
            formEmail.focus();
            return false;
        }
    }

})