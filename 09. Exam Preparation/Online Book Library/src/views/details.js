import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as gameService from '../api/services.js';


const detailsTemplate = (book, onDelete) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            ${book.isOwner
            ? html` 
            <div class="actions">
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
            </div>` 
            : nothing}
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;


export async function detailsView(ctx) {
    const bookId = ctx.params.id;
    const book = await gameService.getById(bookId);

    if (ctx.user) {
        book.isOwner = ctx.user._id == book._ownerId;

    }
    ctx.render(detailsTemplate(book, onDelete));

    async function onDelete() {
        const choice = confirm(`Do you want to delete ${book.title}?`);
        if (choice) {
            await gameService.deleteById(bookId);
            ctx.page.redirect('/catalog');
        }
    }
}