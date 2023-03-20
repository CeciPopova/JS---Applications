
import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { createView } from './views/createView.js'
import { homeView } from "./views/homeView.js";
import { browseView } from "./views/browseView.js";
import { editView } from "./views/editView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { myTeamView } from "./views/myTeamView.js";
import { teamHomeView } from "./views/teamHomeView.js";
import { logout } from './api/data.js';


const root = document.querySelector('main');
updateNav();

page(middleWare);
page('/', homeView);
page('/index.html', homeView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/browse', browseView);
page('/edit/:id', editView);
page('/my-team', myTeamView);
page('/details/:id', teamHomeView);

page.start();

function middleWare(ctx, next) {
    //ctx.render = (content) => render(content, root);
   ctx.render = myRender;
   ctx.updateNav = updateNav;
    next();
}

document.querySelector('.logout').addEventListener('click', async (e) => {
    e.preventDefault();

    await logout();
    updateNav();
    page.redirect('/');

})

function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        document.querySelectorAll('.user').forEach(x => x.style.display = 'block');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
    } else {
        document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'block');
    }
}

function myRender(content) {
    render(content, root);
}
