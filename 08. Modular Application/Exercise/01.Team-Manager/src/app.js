// import { logout } from "./api/api.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { page } from '../../node_modules/page/page.mjs';
import { homeView } from "./views/homeView.js";
import { browseView } from "./views/browseView.js";
import { editView } from "./views/editView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { myTeamView } from "./views/myTeamView.js";
import { teamHomeView } from "./views/teamHomeView.js";


//const root = document.querySelector('div.container');
// document.getElementById('logoutBtn').addEventListener('click', onLogout);

//page(decorateContext);
page('/', homeView);
page('/index.html', homeView);
page('/login', loginView);
page('/register', registerView);
page('/browse', browseView);
page('/edit/:id', editView);
page('/my-team', myTeamView);
page('/team-home', teamHomeView);


//updateUserNav();
page.start();

// function decorateContext(ctx, next) {
//     ctx.render = (content) => render(content, root);
//     ctx.updateUserNav = updateUserNav;
    
//     next();
// }
// function updateUserNav() {
//     const userData = getUserData();

//     if (userData) {
//         document.getElementById('user').style.display = 'inline-block';
//         document.getElementById('guest').style.display = 'none';

//     } else {
//         document.getElementById('user').style.display = 'none';
//         document.getElementById('guest').style.display = 'inline-block';
//     }
// }

// async function onLogout() {
//     await logout();
//     updateUserNav();
//     page.redirect('/');
// }