import { html } from "../../node_modules/lit-html/lit-html.js";
import { getSearch } from "../api/services.js";

const searchTemplate = (onSearch, onChange, cars = []) => html`
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year" @input=${onChange}>
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">

            ${cars.length > 0 
            ? cars.map(c => carTemplate(c))
            : html`<p class="no-cars"> No results.</p>`
            }
            </div>
        </section>
`;
const carTemplate = (car) => html`
                <div class="listing">
                    <div class="preview">
                        <img src=${car.imageUrl}>
                    </div>
                    <h2>${car.brand} ${car.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${car.year}</h3>
                            <h3>Price: ${car.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${car._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>`;             

export async function searchView(ctx){

    let query = '';
    function onChange(e){
        query = e.target.value;
    }

    async function onSearch(){
        let year = Number(query);
        const cars = await getSearch(year);
        ctx.render(searchTemplate(onSearch, onChange, cars));
    }

    ctx.render(searchTemplate(onSearch, onChange));
}