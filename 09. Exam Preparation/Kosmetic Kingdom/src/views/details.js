import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as gameService from '../api/services.js';
import { buy, getAllBuys, getOwnBuys } from "../api/buyService.js";


const detailsTemplate = (item, buys, hasUser, canBuy, isOwner, onDelete, onBuy) => html`
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
                <h4>Bought: <span id="buys">0</span>${buys}</h4>
                <span>${item.description}</span>
        </div>
    </div>
    ${isOwner
        ? html`
    <div id="action-buttons">
        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>`
        : nothing}
    ${showBuyButton(hasUser, canBuy, onBuy)}
</section>`;

const showBuyButton = (hasUser, canBuy, onBuy) => {
    if (hasUser && canBuy) {
        return html`
       <div id="action-buttons">
           <a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>
       </div>`;
    } else {
        return nothing;
    }
}
export async function detailsView(ctx) {
    const productId = ctx.params.id;


    const requests = [
        gameService.getById(productId),
        getAllBuys(productId),

    ]

    const hasUser = Boolean(ctx.user);

    if (hasUser) {
        requests.push(getOwnBuys(productId, ctx.user._id))
    }
    const [product, buys, hasBought] = await Promise.all(requests);

    const isOwner = hasUser && ctx.user._id == product._ownerId;

    const canBuy = !isOwner && hasBought == 0;


    ctx.render(detailsTemplate(product, buys, hasUser, canBuy, isOwner, onDelete, onBuy));

    async function onBuy() {

        await buy(productId);
        ctx.page.redirect('/details/' + productId);

    }


    async function onDelete() {
        const choice = confirm(`Do you want to delete ${product.name}?`);
        if (choice) {
            await gameService.deleteById(productId);
            ctx.page.redirect('/catalog');
        }
    }
}