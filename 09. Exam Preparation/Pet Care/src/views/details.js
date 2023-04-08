import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as gameService from '../api/services.js';



const detailsTemplate = (pet, onDelete) => html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${pet.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                    ${pet.isOwner 
                        ? html`
                    <div class="actionBtn">
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>` 
                    : nothing}
                </div>
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
        const choice = confirm(`Do you want to delete ${game.name}?`);
        if (choice) {
            await gameService.deleteById(gameId);
            ctx.page.redirect('/');
        }
    }
}