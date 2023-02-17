import {html, render} from '../node_modules/lit-html/lit-html.js';


const imputTowns = document.getElementById('towns');
const button = document.getElementById('btnLoadTowns');
const root = document.getElementById('root');

button.addEventListener('click', onClick);

const listTemplate = (data) => html`
 <ul>
     ${data.map(town => html`<li>${town}</li>`)}
 </ul>
 `;

function onClick(e) {
    e.preventDefault();
    if (imputTowns.value !== '') {
        const towns = imputTowns.value.split(', ');
        const result = listTemplate(towns);
        render(result, root);
    
        imputTowns.value = '';
    }
   
}