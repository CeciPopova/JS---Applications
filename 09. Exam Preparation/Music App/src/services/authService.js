import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/users';

const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

const deleteUser = () => {
    localStorage.removeItem('user');
}

const getToken = () => getUser()?.accessToken;


export const getUser = () => {
    let serializedUser = localStorage.getItem('user');
    if (serializedUser) {
        const user = JSON.parse(serializedUser);
        return user
    }

}

export const login = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password })
        .then(user => {
            saveUser(user);
            return user;
        });

export const register = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password })
        .then(user => {
            saveUser(user);
            return user;
        });

        export const logout = () => 
            fetch(`${baseUrl}/logout`, {headers: {'X-Authorization': getToken()}})
            .then(() => {
                deleteUser();

            });
        

