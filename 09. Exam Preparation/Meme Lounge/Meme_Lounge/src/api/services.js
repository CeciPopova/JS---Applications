import * as api from './api.js';

const endpoints = {
    recent : (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    getAllMemes: '/data/memes?sortBy=_createdOn%20desc',
    create: '/data/memes',
    byId: '/data/memes/',
    deleteById: '/data/memes/',
    edit: '/data/memes/'
};

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getAll() {
    return api.get(endpoints.getAllMemes);
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
