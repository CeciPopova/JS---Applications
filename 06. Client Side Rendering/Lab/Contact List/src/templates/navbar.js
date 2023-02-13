import {html} from '../../node_modules/lit-html/lit-html.js';

const navBarTemplate = (ctx) => html`
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="#">Navbar</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <!---- conditional rendering ---->
            ${ctx.contacts.length > 10
                ? html `<span>Cannot Add Contact</span>`
                : html ` 
                    <form @submit=${ctx.addContactHandler}>
                        <input type="text" name="person" />
                        <input type="text" name="phone" />
                        <button class="nav-link">Add Contact</button>
                    </form>`}
        </li>
    </ul>
</div>
</nav>
`;
export default navBarTemplate;