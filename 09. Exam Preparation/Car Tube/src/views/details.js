import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as gameService from '../api/services.js';

const detailsTemplate1 = (game, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

       
        ${game.isOwner 
            ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` 
        : nothing }
        
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    <article class="create-comment">
        <label>Add new comment:</label>
        <form class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>

</section>
`;


const detailsTemplate = (car, onDelete) => html`
<section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${car.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${car.brand}</li>
                    <li><span>Model:</span>${car.model}</li>
                    <li><span>Year:</span>${car.year}</li>
                    <li><span>Price:</span>${car.price}$</li>
                </ul>

                <p class="description-para">${car.description}</p>
                ${car.isOwner 
                ? html`
                <div class="listings-buttons">
                    <a href="/edit/${car._id}" class="button-list">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
                </div>` 
                : nothing}
            </div>
        </section>`;

export async function detailsView(ctx) {
    const gameId = ctx.params.id;
    const game = await gameService.getById(gameId);

    if (ctx.user) {
        game.isOwner = ctx.user._id == game._ownerId;

    }
    ctx.render(detailsTemplate(game, onDelete));

    async function onDelete() {
        const choice = confirm(`Do you want to delete this listing?`);
        if (choice) {
            await gameService.deleteById(gameId);
            ctx.page.redirect('/catalog');
        }
    }
}