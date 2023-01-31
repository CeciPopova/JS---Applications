import { homePage } from "./home.js";
import { showView } from "./util.js";

const createSection = document.querySelector('#add-movie');
const form = createSection.querySelector('form');
form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    await createMovie(title, description, img);
    form.reset();
    homePage();
}

export function createPage() {
    showView(createSection);
}

async function createMovie(title, description, img) {
    const user = JSON.parse(localStorage.getItem('user'));
   

    await fetch('http://localhost:3030/data/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({title, description, img })
    });
}
