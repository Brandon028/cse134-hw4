
    var switchContainer = document.querySelector('.switch');
    var icon = document.getElementById('icon');
    var checkbox = document.getElementById("darkmode-button");
    // If JavaScript is enabled, show the switch
    if (switchContainer) {
      switchContainer.style.display = 'inline-block';
    }

    if (localStorage.getItem('isDark') == 'true'){
        console.log('true');
        document.getElementsByTagName("HTML")[0].classList.add('dark-mode');
        icon.src = "moon.png";
        localStorage.setItem("isDark", true);
        checkbox.checked=true;

    }
    

    
    checkbox.addEventListener( "change", () => {
       if (checkbox.checked ) {
        document.getElementsByTagName("HTML")[0].classList.add('dark-mode');
        icon.src = "moon.png";
        localStorage.setItem("isDark", true);

       } else {
        document.getElementsByTagName("HTML")[0].classList.remove('dark-mode');
        icon.src = "sun.png";
        localStorage.setItem("isDark", false);
    }
    });


    var formErrors = [];

    var form = document.getElementById('contact-form');
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var comments = document.getElementById('comments');
    var cc = document.getElementById('comments-info-message');
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const validCharRegex = /^[0-9A-Za-z.@]+$/
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            // If form is invalid, prevent default form submission
            formErrors.push('invalid form');
        }

        fetch('http://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formErrors)
        })
        console.log(formErrors);

    });



    //emails

    email.addEventListener("input", checkEmailErrors);

    function checkEmailErrors(e) {
        
        if (email.validity.valueMissing) {
            email.setCustomValidity("Please fill out this field");
            emailError.classList.remove("fade-in");
            formErrors.push('empty email field');
        } 
        else if (!(emailRegex.test(email.value))){
            email.setCustomValidity("Please enter a valid email");
            //check for illegal character
            checkIllegalCharacter(email.value)
        }

        else if (!form.checkValidity()) {
            // If form is invalid, prevent default form submission
            email.setCustomValidity("Input not valid");

          }
        else{
            email.setCustomValidity("");
    
        }

        email.reportValidity();    
    }

    const emailError = document.getElementById('email-error-message');
    
    function checkIllegalCharacter(text){
        if (validCharRegex.test(text)){
            emailError.classList.remove("fade-in");
            console.log('false');
        }
        else{
            //css to fade in and out message in error message
            emailError.innerText="illegal character present";
            formErrors.push('invalid character');

            emailError.classList.add("fade-in");
            email.setCustomValidity("Illegal character present");
        }


    }

    comments.addEventListener("input", checkCCLimit);
    function checkCCLimit(e){
        cc.innerText = (200 - comments.value.length) + 'characters left';
        cc.style.color = `rgb(${comments.value.length + 50}, ${200 - comments.value.length},0)`;

    }

    
    
    
    