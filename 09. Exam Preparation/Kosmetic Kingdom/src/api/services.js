import * as api from './api.js';

const endpoints = {
    //recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    getAllGames: '/data/products?sortBy=_createdOn%20desc',
    create: '/data/products',
    byId: '/data/products/',
    deleteById: '/data/products/',
    edit: '/data/products/',
   
};

// export async function getRecent() {
//     return api.get(endpoints.recent);
// }



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
