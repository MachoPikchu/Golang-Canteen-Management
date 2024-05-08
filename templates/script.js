const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('#email').value;
    const password = loginForm.querySelector('#password').value;

    fetch('http://localhost:8000/users/login', {
        method: 'POST',

        body: JSON.stringify({ Email: email, Password: password }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});
// Signup Form
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = signupForm.querySelector('#firstName').value;
    const lastName = signupForm.querySelector('#lastName').value;
    const email = signupForm.querySelector('#email').value;
    const phone = signupForm.querySelector('#phone').value;
    const password = signupForm.querySelector('#password').value;

    fetch('http://localhost:8000/users/signup', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});
