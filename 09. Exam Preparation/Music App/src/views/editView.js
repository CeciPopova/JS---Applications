import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as albumService from '../services/albumService.js';
import { albumIsInvalid} from '../utils/validators.js';


const editTemplate = (album, submitHandler) => html`
 <section class="editPage">
            <form @submit=${submitHandler}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value=${album.name}>

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${album.imgUrl}>

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value=${album.price}>

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${album.releaseDate}>

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value=${album.artist}>

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value=${album.genre}>

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${album.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`;

export const editView = (ctx) => {
    const albumId = ctx.params.albumId;
    const submitHandler = (e) => {
        e.preventDefault();
        const albumData = Object.fromEntries(new FormData(e.currentTarget));

        if (albumIsInvalid(albumData)) {
            alert('All fields should be filled!');
            return;
        }

        albumService.edit(albumId, albumData)
        .then(() => {
            ctx.page.redirect(`/albums/${albumId}`)
        })
    };

    albumService.getOne(albumId)
    .then(album => {
        ctx.render(editTemplate(album,submitHandler ))
    })
}