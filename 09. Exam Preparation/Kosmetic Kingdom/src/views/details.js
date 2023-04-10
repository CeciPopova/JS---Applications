import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as gameService from '../api/services.js';


const detailsTemplate = (user, item, onDelete, onBuy) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${item.imageUrl} alt="example1" />
        <p id="details-title">${item.name}</p>
        <p id="details-category">
            Category: <span id="categories">${item.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${item.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">0</span> times.</h4>
                <span>${item.description}</span>
        </div>
    </div>
    ${item.isOwner
    ? html`
    <div id="action-buttons">
        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>`
    : nothing}
    ${showBuyButton(user, item, onBuy)}
</section>`;

const showBuyButton = (user, item, onBuy) => {
    if (user && !item.isOwner) {
       return  html`
       <div id="action-buttons">
           <a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>
       </div>`;
    } else {
        return nothing;
    }
}
export async function detailsView(ctx) {
    const gameId = ctx.params.id;
    const game = await gameService.getById(gameId);
    const user = ctx.user;
   

    if (ctx.user) {
        game.isOwner = ctx.user._id == game._ownerId;

    }


    ctx.render(detailsTemplate(user, game, onDelete, onBuy));

    async function onBuy() {
        const choice = confirm(`Do you want to buy ${game.name}?`);
        if (choice) {
            await gameService.buy(gameId);
            ctx.page.redirect('/catalog');
        }
    }

    
    async function onDelete() {
        const choice = confirm(`Do you want to delete ${game.name}?`);
        if (choice) {
            await gameService.deleteById(gameId);
            ctx.page.redirect('/catalog');
        }
    }
}