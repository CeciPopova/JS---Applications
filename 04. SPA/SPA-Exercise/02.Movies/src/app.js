// [ ] improve HTMLstructure
// [ ] create app.js module
// [ ] create router.js containing hide and display of view
// [ ] placeholders of all views


import { homePage } from './home.js';
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { createPage } from "./create.js";
import { updateNav } from './util.js';

//implement views
//- create request logic
//- DOM manipulation logic
// [ ] register
// [ ] catalog
// [ ] login
// [ ] create
// [ ] details
// [ ] like
// [ ] edit
// [ ] delete

//showView('#home-page');
const routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logoutPage,
    '/register': registerPage,
    '/create': createPage,
    
}

document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);

function onNavigate(e) {
    if (e.target.tagName =='A' && e.target.href) {
        e.preventDefault();
        const url = new URL(e.target.href);

        const view = routes[url.pathname]
       if (typeof view == 'function') {
        view();
       }
    }
}

function logoutPage() {
    localStorage.removeItem('user');
    updateNav();
}
updateNav();
//start app in catalog view
homePage();
