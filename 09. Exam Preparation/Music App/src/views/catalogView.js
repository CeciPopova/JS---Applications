import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import * as albumService from '../services/albumService.js';
import { albumTemplate } from './templates/albumTemplate.js';


const catalogTemplate = (albums, user) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>
        ${albums.map(x => albumTemplate(x, Boolean(user)))}
    
        ${albums.length == 0
        ? html`<p>No Albums in Catalog!</p>`
        : nothing
        }
    </section>
`;

// artist:"Pink Floyd"
// description: "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records."
// genre:"Rock Music"
// imgUrl:"/images/pinkFloyd.jpg"
// name: "The Dark Side of the Moon"
// price:"28.75"
// releaseDate:"March 1, 1973"
// _createdOn: 1617194295474
// _id : "126777f5-3277-42ad-b874-76d043b069cb"
// _ownerId:"847ec027-f659-4086-8032-5173e2f9c93a"




export const catalogView = (ctx) => {
    albumService.getAll()
        .then(albums => {
            ctx.render(catalogTemplate(albums, ctx.user));
        });
}