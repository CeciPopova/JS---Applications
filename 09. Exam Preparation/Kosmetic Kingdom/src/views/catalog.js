import { html } from "../../node_modules/lit-html/lit-html.js";
import * as gamesService from '../api/services.js';


const catalogTemplate = (items) => html`
<h2>Products</h2>
            <section id="dashboard">
            ${items.length > 0 
            ? items.map(cartTemplate)
        : html`<h2>No products yet.</h2>`} 
            </section>`;

const cartTemplate = (item) => html`
<div class="product">
    <img src=${item.imageUrl} alt="example1" />
    <p class="title">${item.name}</p>
    <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
</div>`

 
export async function catalogView(ctx) {
    const games = await gamesService.getAll();
    ctx.render(catalogTemplate(games));
}