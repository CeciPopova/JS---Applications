import { html } from "../../node_modules/lit-html/lit-html.js";
import * as eventService from '../api/services.js';
import { createSubmitHandler } from "../utils.js";

const editTemplate = (event, onSubmit) => html`
  <section id="edit">
        <div class="form">
          <h2>Edit Event</h2>
          <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="name" id="name" placeholder="Event" .value=${event.name}/>
            <input type="text" name="imageUrl" id="event-image" placeholder="Event Image" .value=${event.imageUrl}/>
            <input type="text" name="category" id="event-category" placeholder="Category" .value=${event.category}/>


            <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50">${event.description}</textarea>

            <label for="date-and-time">Event Time:</label>
            <input type="text" name="date" id="date" placeholder="When?" .value=${event.date}/>

            <button type="submit">Edit</button>
          </form>
        </div>
      </section>`;


export async function editView(ctx) {
    const eventId = ctx.params.id;
    const event = await eventService.getById(eventId);



    ctx.render(editTemplate(event, createSubmitHandler(ctx, onSubmit)));
}


async function onSubmit(ctx, data, event) {
    const eventId = ctx.params.id;

    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are required!');
    }
    
    await eventService.edit(eventId, {
        name: data.name,
        imageUrl: data.imageUrl, 
        category: data.category, 
        description: data.description, 
        date: data.date
    });

    event.target.reset();
    ctx.page.redirect('/details/' + eventId);
}