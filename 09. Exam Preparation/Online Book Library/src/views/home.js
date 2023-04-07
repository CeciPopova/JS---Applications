import { html } from "../../node_modules/lit-html/lit-html.js";
import * as gamesService from '../api/services.js';


const homeTemplate = (books) => html`
  <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <ul class="my-books-list">
            ${books.length > 0 
            ? books.map(cartTemplate)
            : html`<p class="no-books">No books in database!</p>`
            }
            </ul>
        </section>`;

const cartTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>`;

export async function homeView(ctx) {
    const books = await gamesService.getRecent(ctx.user._id);

    ctx.render(homeTemplate(books));
}