import { html } from "../../node_modules/lit-html/lit-html.js";
import * as gameService from '../api/services.js';
import { createSubmitHandler } from "../utils.js";


// const editTemplate = (game, onSubmit) => html`
// <section id="edit-page" class="auth">
//     <form @submit=${onSubmit} id="edit">
//         <div class="container">

//             <h1>Edit Game</h1>
//             <label for="leg-title">Legendary title:</label>
//             <input type="text" id="title" name="title" .value=${game.title}>

//             <label for="category">Category:</label>
//             <input type="text" id="category" name="category" .value=${game.category}>

//             <label for="levels">MaxLevel:</label>
//             <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

//             <label for="game-img">Image:</label>
//             <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

//             <label for="summary">Summary:</label>
//             <textarea name="summary" id="summary" >${game.summary}</textarea>
//             <input class="btn submit" type="submit" value="Edit Game">

//         </div>
//     </form>
// </section>
// `;

const editTemplate = (meme, onSubmit) => html`
 <section id="edit-meme">
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${meme.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`;

export async function editView(ctx) {
    const memeId = ctx.params.id;
    const meme = await gameService.getById(memeId);



    ctx.render(editTemplate(meme, createSubmitHandler(ctx, onSubmit)));
}


async function onSubmit(ctx, data, event) {
    const memeId = ctx.params.id;

    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are required!');
    }
    
    await gameService.edit(memeId, {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        
    });

    event.target.reset();
    ctx.page.redirect('/details/' + memeId);
}