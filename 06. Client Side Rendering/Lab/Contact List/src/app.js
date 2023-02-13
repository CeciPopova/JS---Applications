import {render} from '../node_modules/lit-html/lit-html.js';
import mainTemplate from './templates/main.js';
import {getContacts} from './api.js';

const rootElement = document.getElementById('root');

const contacts = await getContacts();
render(mainTemplate({contacts, addContactHandler}), rootElement);

//don't do this!
function addContactHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let person = formData.get('person');
    let phone = formData.get('phone');

    fetch('http://localhost:3030/jsonstore/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({person, phone})

    })
    .then(res => res.json())
    .then(contact => {
        let currentContacts = [...contacts, contact];
        render(mainTemplate({contacts: currentContacts, addContactHandler}), rootElement);
    });
}

