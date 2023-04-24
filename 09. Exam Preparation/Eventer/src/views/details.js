import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { donate, getAllDonations, getOwnDonations } from "../api/donations.js";
import * as eventService from '../api/services.js';


const detailsTemplate = (event, donations, hasUser, canDonate, isOwner, onDelete, onGo) => html`
 <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${event.imageUrl} alt="example1" />
          <p id="details-title">${event.name}</p>
          <p id="details-category">
            Category: <span id="categories">${event.category}</span>
          </p>
          <p id="details-date">
            Date:<span id="date">${event.date}</span></p>
          <div id="info-wrapper">
            <div id="details-description">
              <span>${event.description}</span>
            </div>

          </div>

          <h3>Going: <span id="go">${donations}</span> times.</h3>
          ${eventControl(event, hasUser, canDonate, isOwner, onDelete, onGo)}
        </div>
      </section>`;

function eventControl(event, hasUser, canDonate, isOwner, onDelete, onGo) {
  if (hasUser == false) {
      return nothing;
  }
  if (canDonate) {
      return html`
      <div id="action-buttons">
            <a @click=${onGo} href="javascript:void(0)" id="go-btn">Going</a>
          </div>`
  }
  if (isOwner) {
      return html`
    <div id="action-buttons">
      <a href="/edit/${event._id}" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>
     `;
  }
}


export async function detailsView(ctx) {

  const eventId = ctx.params.id;
 
  const requests = [
      eventService.getById(eventId),
      getAllDonations(eventId),

  ]

  const hasUser = Boolean(ctx.user);

  if (hasUser) {
      requests.push(getOwnDonations(eventId, ctx.user._id))
  }
  const [event, donations, hasDonation] = await Promise.all(requests);

  const isOwner = hasUser && ctx.user._id == event._ownerId;

  const canDonate = !isOwner && hasDonation == 0;

  ctx.render(detailsTemplate(event, donations, hasUser, canDonate, isOwner, onDelete, onGo));

  async function onDelete() {
      const choice = confirm(`Do you want to delete ${event.name}?`);
      if (choice) {
          await eventService.deleteById(eventId);
          ctx.page.redirect('/catalog');
      }
  }

  async function onGo() {
      await donate(eventId);
      ctx.page.redirect('/details/' + eventId);
  }
}