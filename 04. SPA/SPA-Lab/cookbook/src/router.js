import {renderHome} from './home.js';
import {login} from './login.js';
import {register} from './register.js';
import {createRecipie} from './create.js';
import {renderLogout} from './logout.js'

const mainContent = document.querySelector('.main-content');
export function router(path) {

    for (const section of mainContent.children) {
        section.style.display = 'none';
    }
    let routes = {
        '/': renderHome,
        '/login': login,
        '/register': register,
        '/create': createRecipie,
        '/logout': renderLogout
    }

    const renderer = routes[path];
    renderer();
}