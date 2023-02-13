import {html} from '../../node_modules/lit-html/lit-html.js';
import contactTemplate from './contact.js';


const contactListTemplate = (contacts) => html`
<div class="contact-list" style="display: flex; justify-content: space-around;">
    ${contacts.map(x => html`${contactTemplate(x)}`)}
</div>    
`;

export default contactListTemplate;