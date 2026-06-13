const form = document.getElementById('contact-form');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Send the data to Formspree
    const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        const name = document.getElementById('name').value;
        const responseDiv = document.getElementById('response-message');
        
        // Hide the form and show success
        form.style.display = 'none';
        responseDiv.style.display = 'block';
        responseDiv.innerHTML = `<h3>Thanks, ${name}!</h3><p>Your message has been received.</p>`;
    } else {
        alert("Oops! There was a problem submitting your form.");
    }
});