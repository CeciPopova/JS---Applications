import { html } from "../../node_modules/lit-html/lit-html.js";
import * as gamesService from '../api/services.js';

// const homeTemplate = (games) => html`
// <section id="welcome-world">

//     <div class="welcome-message">
//         <h2>ALL new games are</h2>
//         <h3>Only in GamesPlay</h3>
//     </div>
//     <img src="./images/four_slider_img01.png" alt="hero">

//     <div id="home-page">
//         <h1>Latest Games</h1>
//         ${games.length > 0 
//             ? games.map(previewTemplate) 
//             : html` <p class="no-articles">No games yet</p>`
//             }
//     </div>
// </section>`;

// const previewTemplate = (game) => html`
// <div class="game">
//     <div class="image-wrap">
//         <img src=${game.imageUrl}>
//     </div>
//     <h3>${game.title}</h3>
//     <div class="rating">
//         <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
//     </div>
//     <div class="data-buttons">
//         <a href="/details/${game._id}" class="btn details-btn">Details</a>
//     </div>
// </div>`;
const homeTemplate = () => html`
        <section class="welcome-content">
            <article class="welcome-content-text">
                <h1>We Care</h1>
                <h1 class="bold-welcome">Your Pets</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
            </article>
            <article class="welcome-content-image">
                <img src="./images/header-dog.png" alt="dog">
            </article>
        </section>`;

export async function homeView(ctx) {
    
    ctx.render(homeTemplate());
}