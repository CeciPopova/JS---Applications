import * as userService from '../services/userService.js';

export const logoutView = (ctx) => {
    userService.logout()
    .then(() => {
        ctx.page.redirect('/');

    });
}