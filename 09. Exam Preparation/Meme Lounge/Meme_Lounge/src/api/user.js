import * as api from './api.js';
import { setUserData, clearUserData } from '../utils.js';


const endpoints ={
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
};

export async function login(email, password) {
    const result = await api.post(endpoints.login, { email, password });
    setUserData(result);

    return result;
}

export async function register(username, email, password) {
     const result = await api.post(endpoints.register, { username, email, password });
    setUserData(result);
    
    return result;
}

export async function logout() {
    api.get(endpoints.logout);
    clearUserData();
}