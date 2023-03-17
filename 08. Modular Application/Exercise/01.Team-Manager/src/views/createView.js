import { html } from '../../node_modules/lit-html/lit-html.js';
import { createTeam, requestMember } from '../api/data.js';

let context = null;
export async function createView(ctx) {
    context = ctx;
    ctx.render(createTeamTemplate())
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { name, logoUrl, description } = Object.fromEntries(formData);
    const response = await createTeam(name, logoUrl, description);
    const addMember = await requestMember(response._id);
    context.page.redirect(`/details/${response._id}`);


}

function createTeamTemplate() {
    return html`
    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
                <div class="error">Error message.</div>
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>
    </section>
    `;
}