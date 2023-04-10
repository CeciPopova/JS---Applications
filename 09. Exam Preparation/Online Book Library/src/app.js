import page from '../node_modules/page/page.mjs';
import { addRender } from './middlewares/render.js';
import { catalogView } from './views/catalog.js';
import { homeView } from './views/home.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './api/user.js';
import { addSession } from './middlewares/sessionMiddleware.js';



page(addSession);
page(addRender);


page('/catalog', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/home', homeView);
page('/edit/:id', editView);
page('/logout', onLogout);



page.start();

function onLogout() {
    logout();
    page.redirect('/catalog');
}