import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../utils.js";
import * as eventService from '../api/services.js';

const createTemplate = (onSubmit) => html`
 <section id="create">
        <div class="form">
          <h2>Add Event</h2>
          <form @submit=${onSubmit} class="create-form">
            <input type="text" name="name" id="name" placeholder="Event" />
            <input type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" />
            <input type="text" name="category" id="event-category" placeholder="Category" />


            <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>

            <input type="text" name="date" id="date" placeholder="When?" />

            <button type="submit">Add</button>
          </form>
        </div>
      </section>
`;

export function createView(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are required!');
    }
    
    await eventService.create({
        name: data.name,
        imageUrl: data.imageUrl, 
        category: data.category, 
        description: data.description, 
        date: data.date
    });

    event.target.reset();

    ctx.page.redirect('/catalog');
}