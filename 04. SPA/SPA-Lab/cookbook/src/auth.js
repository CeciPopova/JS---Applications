const guestElement = document.getElementById('guest');
const userElement = document.getElementById('user');

export function updateAuth() {
    let serializedUser = localStorage.getItem('user');

    if (serializedUser) {
        userElement.style.display = 'inline';
        guestElement.style.display = 'none';
    } else {
        userElement.style.display = 'none';
        guestElement.style.display = 'inline';
    }
}

export function logout() {
    localStorage.removeItem('user');
    updateAuth();
}

export function getToken() {
    let serializedUser = localStorage.getItem('user');
    console.log(serializedUser);

    if (serializedUser) {
        let user = JSON.parse(serializedUser);
        return user.accessToken;
    }
   
} 