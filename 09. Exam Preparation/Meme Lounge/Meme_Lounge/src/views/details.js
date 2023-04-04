import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as gameService from '../api/services.js';


const detailsTemplate = (meme, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>
            ${meme.isOwner 
                ? html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger" @click=${onDelete} href="javascript:void(0)">Delete</button>`
            : nothing} 
            
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const memeId = ctx.params.id;
    const meme = await gameService.getById(memeId);
   
    if (ctx.user) {
        meme.isOwner = ctx.user._id == meme._ownerId;

    }
    ctx.render(detailsTemplate(meme, onDelete));

    async function onDelete() {
        const choice = confirm(`Do you want to delete ${meme.title}?`);
        if (choice) {
            await gameService.deleteById(memeId);
            ctx.page.redirect('/catalog');
        }
    }
}