import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as service from '../api/services.js';
import { getUserData } from "../utils.js";
import { makeLike } from "../api/user.js";


const detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton , onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            ${isOwner
            ? html` 
            <div class="actions">
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
            </div>` 
            : nothing}
             <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
          ${likeControlTemplate(showLikeButton, onLike)}
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${likes}</span>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;


const likeControlTemplate = (showLikeButton, onLike) => {
    if (showLikeButton) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`;
    } else {
        return null;
    }
};

export async function detailsView(ctx) {
    const bookId = ctx.params._id;
   
    const userData = getUserData();
  

   const[book, likes, hasLike] = await Promise.all([
    service.getById(bookId),
    service.getLikesByBookId(bookId),
    userData ? service.getUserLikeByBookId(bookId, userData._id) : 0
   ]);
  
    
    const isOwner = userData && userData._id == book._ownerId;
    let showLikeButton = userData != null && hasLike == false && isOwner == false;
   
   
    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike));

   async function onLike() {
    await makeLike(bookId);
    console.log('Hello');
    ctx.page.redirect('/details/' + bookId);
    
   }

    async function onDelete() {
        const choice = confirm(`Do you want to delete ${book.title}?`);
        if (choice) {
            await gameService.deleteById(bookId);
            ctx.page.redirect('/catalog');
        }
    }
}