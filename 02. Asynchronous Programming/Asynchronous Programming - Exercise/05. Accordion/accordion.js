async function solution() {
    let main = document.getElementById('main');

    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    const res = await fetch(url);
    const data = await res.json();

    data.forEach(a => {
        let divAccordeon = createElement('div', '', ['class','accordion']);
        let divHead = createElement('div', '', ['class','head']);
        let span = createElement('span', a.title);
        let button = createElement('button', 'More', ['class','button','id',a._id]);

        let divExtra = createElement('div', '', ['class','extra']);
        let p = createElement('p');

        button.addEventListener('click', toggle);

        divExtra.appendChild(p);
        divAccordeon.appendChild(divExtra);
        divHead.appendChild(button);
        divHead.appendChild(span);
        divAccordeon.appendChild(divHead);
        main.appendChild(divAccordeon);
    });

    async function toggle(e) {

        let accordion = e.target.parentNode.parentNode;
        let p = e.target.parentNode.parentNode.children[0].children[0];
        let extra = e.target.parentNode.parentNode.children[0];


        let id = e.target.id;

        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const res = await fetch(url);

        const data = await res.json();
        p.textContent = data.content;

        let hidden = e.target.textContent === 'More';

        extra.style.display = hidden ? 'block' : 'none';
        e.target.textContent = hidden ? 'Less' : 'More'
    }


    function createElement(type, content, attributes = []) {

        const element = document.createElement(type);
        if (content) {
            element.textContent = content;
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
            }
        }
        return element;
    }
}
solution();