function attachEvents() {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const ul = document.getElementById('phonebook');

    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    loadBtn.addEventListener('click', onClickLoad);
    createBtn.addEventListener('click', onClickCreate);

    async function onClickLoad() {
        //ul.innerHTML = '';
        ul.replaceChildren();
        const response = await fetch(url);
        const data = await response.json();
       
        Object.values(data).forEach(x => {
            const { person, phone, _id} = x;
            const li = createElement('li', `${person}: ${phone}`, ul);
            li.setAttribute('id', _id);
            const deleteBtn = createElement('button', 'Delete', li);
            deleteBtn.setAttribute('id', 'btnDelete');
            deleteBtn.addEventListener('click', onClickDelete);
        })
    }

    async function onClickDelete(e) {
        const id = e.target.parentNode.id;
        e.target.parentNode.remove();

        const deleteResponse = await fetch(`${url}/${id}`, {
            method:'DELETE'
        });
    }
   
    function createElement(type, text, appender) {
        const result = document.createElement(type);
        result.textContent = text;
        appender.appendChild(result);
        return result;
    }

    async function onClickCreate() {
        if (person.value !== '' && phone.value !== '') {
            const response = await fetch(url, {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({person:person.value, phone:phone.value})
            });
            ul.innerHTML = '';
            loadBtn.click();

            person.value = '';
            phone.value = '';
        };
    }
}

attachEvents();