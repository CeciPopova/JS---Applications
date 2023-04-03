import { html, render } from '../../node_modules/lit-html/lit-html.js';


const navTemplate = (user) => html`
        <nav>
            <a href="/catalog">All Memes</a>
             ${user 
                ? html` 
                <div class="user">
                <a href="/create">Create Meme</a>
                <div class="profile">
                    <span>Welcome, ${user.email}</span>
                    <a href="/details">My Profile</a>
                    <a href="/logout">Logout</a>
                </div>
            </div>` 
            : html` 
            <div class="guest">
                <div class="profile">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                <a class="active" href="/">Home Page</a>
            </div>`}
          
        </nav>`;

const header = document.querySelector('.my-header');

const root = document.getElementById('main-content');

function ctxRender(content) {
    render(content, root);
}

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header);
    ctx.render = ctxRender;
    next();
}