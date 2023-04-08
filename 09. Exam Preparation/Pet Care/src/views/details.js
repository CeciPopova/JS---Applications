import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { donate, getAllDonations, getOwnDonations } from "../api/donations.js";
import { getById, deleteById } from '../api/services.js';

const detailsTemplate = (pet, donations, hasUser, canDonate, isOwner, onDelete, onLike) => html`
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
                        <h4 class="donation">Donation: ${donations * 100}$</h4>
                    </div>
                  ${petControl(pet, hasUser, canDonate, isOwner, onDelete, onLike)}
                </div>
            </div>
        </section>`;

        
function petControl(pet, hasUser, canDonate, isOwner, onDelete, onLike) {
    if (hasUser == false) {
        return nothing;
    }
    if (canDonate) {
        return html`
        <div class="actionBtn">
            <a @click=${onLike} href="javascript:void(0)" class="donate">Donate</a>
        </div>`
    }
    if (isOwner) {
        return html`
        <div class="actionBtn">
            <a href="/edit/${pet._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        </div>`
    }
}

export async function detailsView(ctx) {

    const petId = ctx.params.id;
   
    const requests = [
        getById(petId),
        getAllDonations(petId),

    ]

    const hasUser = Boolean(ctx.user);

    if (hasUser) {
        requests.push(getOwnDonations(petId, ctx.user._id))
    }
    const [pet, donations, hasDonation] = await Promise.all(requests);

    const isOwner = hasUser && ctx.user._id == pet._ownerId;

    const canDonate = !isOwner && hasDonation == 0;

    ctx.render(detailsTemplate(pet, donations, hasUser, canDonate, isOwner, onDelete, onLike));

    async function onDelete() {
        const choice = confirm(`Do you want to delete ${pet.name}?`);
        if (choice) {
            await deleteById(petId);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await donate(petId);
        ctx.page.redirect('/details/' + petId);
    }
}