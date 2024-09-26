document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const { name, email, message } = Object.fromEntries(new FormData(event.target).entries());
    const formData = { name, email, message };

    fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        alert('Повідомлення успішно відправлено!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Виникла помилка при відправленні повідомлення.');
    });
});
