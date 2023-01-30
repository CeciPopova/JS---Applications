import {updateAuth} from './auth.js';

const registerSection = document.querySelector('.register');
const registerForm = registerSection.querySelector('form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    console.log(formData);
    let email = formData.get('email');
    let password = formData.get('password');
    let repassword = formData.get('repassword');
    if (repassword !== password) {
        alert('Wrong password!Please try again!')
        registerSection.style.display = 'none';
    }else{

    fetch('http://localhost:3030/users/register', {
        method:'POST',
        headers: {'content-type':'aplication/json'},
        body: JSON.stringify({email,password})
    })
    .then(res => res.json())
    .then(user => {
        localStorage.setItem('user',JSON.stringify(user));
        updateAuth();
        alert('Succsessfully registered!');
        registerSection.style.display = 'none';
    })
}
   
})


export function register() {
    registerSection.style.display = 'block';
}