


function sendEmail(e) {
    e.preventDefault(); 
    
    const submitBtn = document.getElementById('submitBtn');
    const buttonText = submitBtn.querySelector('.button-text');
    const formContainer = document.getElementById('formContainer');
    const formSuccess = document.getElementById('formSuccess');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const checkboxes = document.querySelectorAll('.checkbox-input:checked');
    const selectedServices = Array.from(checkboxes).map(cb => cb.value).join(', ');

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        selected_services: selectedServices || 'None selected',
        website: 'bricebeaird.com'
    };


    emailjs.send("service_mcusd0p", "template_4g4q0gk", templateParams)
        .then(() => {
            buttonText.textContent = 'Sent!';

            document.getElementById('successEmail').textContent = templateParams.from_email;
            document.getElementById('successServices').textContent = templateParams.selected_services;
            document.getElementById('successMessage').textContent = templateParams.message;

            setTimeout(() => {
                formContainer.style.display = 'none';
                formSuccess.classList.add('form-success-show');
            }, 1000);
        })
        .catch((error) => {
            console.error("Error sending message:", error);
            buttonText.textContent = 'Error';
            alert("Failed to send the message.");

        })

        .finally(() => {
            submitBtn.disabled = false;
        });

    return false; 
}

contactForm.addEventListener('submit', sendEmail);