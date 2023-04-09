import * as api from './api.js';

const endpoints = {
    search: (query) => `/data/cars?where=year%3D${query}`,
    recent: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20des`,
    getAllGames: '/data/cars?sortBy=_createdOn%20desc',
    create: '/data/cars',
    byId: '/data/cars/',
    deleteById: '/data/cars/',
    edit: '/data/cars/'
};

export async function getSearch(query) {
    return api.get(endpoints.search(query));
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
