import { html } from "../../node_modules/lit-html/lit-html.js";
import * as gameService from '../api/services.js';
import { createSubmitHandler } from "../utils.js";


const editTemplate = (item, onSubmit) => html`
<section id="edit">
                <div class="form">
                    <h2>Edit Product</h2>
                    <form @submit=${onSubmit} class="edit-form">
                        <input type="text" name="name" id="name" placeholder="Product Name" .value=${item.name}/>
                        <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${item.imageUrl}/>
                        <input type="text" name="category" id="product-category" placeholder="Category" .value=${item.category}/>
                        <textarea id="product-description" name="description" placeholder="Description" rows="5"
                            cols="50">${item.description}</textarea>

                        <input type="text" name="price" id="product-price" placeholder="Price" .value=${item.price}/>
                        <button type="submit">post</button>
                    </form>
                </div>
            </section>
`;

export async function editView(ctx) {
    const gameId = ctx.params.id;
    const game = await gameService.getById(gameId);



    ctx.render(editTemplate(game, createSubmitHandler(ctx, onSubmit)));
}


async function onSubmit(ctx, data, event) {
    const gameId = ctx.params.id;

    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are required!');
    }
    
    await gameService.edit(gameId, {
        name: data.name,
        imageUrl: data.imageUrl, 
        category: data.category, 
        description: data.description, 
        price: data.price

    });

    event.target.reset();
    ctx.page.redirect('/details/' + gameId);
}