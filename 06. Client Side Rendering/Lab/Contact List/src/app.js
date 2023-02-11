import navBarTemplate from "./templates/navbar.js";
import contactTemplate from "./templates/contact.js";
import contactListTemplate from "./templates/contactList.js";
import {getContacts} from './api.js';
import render from './render.js';


const rootElement = document.getElementById('root');

const navbarTemplateResult = navBarTemplate();

render(navbarTemplateResult, rootElement);

const contacts = await getContacts();
contactListTemplate(contacts);

render(contactListTemplate(contacts), rootElement);

window.addContact = function() {
    fetch('http://localhost:3030/jsonstore/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({person: 'Tsetsi', phone: '6984203699'})
    })
    .then(res => res.json())
    .then(contact => {
        render(contactTemplate(contact), document.querySelector('.contact-list'));
    })
}

