import { html } from "../../node_modules/lit-html/lit-html.js";
import * as eventsService from '../api/services.js';


const cartTemplate = (event) => html`
 <div class="event">
          <img src=${event.imageUrl} alt="example1" />
          <p class="title">${event.name}</p>
          <p class="date">${event.date}</p>
          <a class="details-btn" href="/details/${event._id}">Details</a>
        </div>`;

const catalogTemplate = (events) => html`
<h2>Current Events</h2>
<section id="dashboard">
${events.length > 0 
    ? events.map(cartTemplate)
    : html`<h4>No Events yet.</h4>`
}
</section>`;

export async function catalogView(ctx) {
    const events = await eventsService.getAll();
    ctx.render(catalogTemplate(events));
}