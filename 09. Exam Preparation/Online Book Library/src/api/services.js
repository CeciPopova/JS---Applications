import * as api from './api.js';

const endpoints = {
    recent : (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    getAllGames: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    byId: '/data/books/',
    deleteById: '/data/books/',
    edit: '/data/books/',
   
    totalLikes:  (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    userLikesByBook: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getUserLikeByBookId(bookId, userId) {
    return api.get(endpoints.userLikesByBook(bookId , userId));
}




export async function getLikesByBookId(bookId) {
   return api.get(endpoints.totalLikes(bookId));
}

export async function getRecent(userId) {
    return api.get(endpoints.recent(userId));
}

export async function getAll() {
    return api.get(endpoints.getAllGames);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function deleteById(id) {
    return api.del(endpoints.deleteById + id);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}
