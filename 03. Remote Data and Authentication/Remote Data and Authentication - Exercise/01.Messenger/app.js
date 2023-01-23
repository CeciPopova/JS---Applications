// const url = `http://localhost:3030/jsonstore/messenger`;
// const messages = document.getElementById('messages');

// function attachEvents() {

//     document.getElementById('submit').addEventListener('click', postMessage);
//     document.getElementById('refresh').addEventListener('click', loadAllMessages);

// }
// async function postMessage() {
//     const [author, content] = [document.getElementById('author'), document.getElementById('content')];

//     if (author.value !== '' || content.value !== '') {

//         await request(url,{author:author.value, content: content.value});

//         author.value = '';
//         content.value = '';
//     }
// }

// async function loadAllMessages() {
//     const res = await fetch(url);
//     const data = await res.json();

//     messages.value = Object.values(data).map(({author, content}) => `${author}: ${content}`).join('\n');

// }

// async function request(url, options) {
//     if (options) {
//         options = {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(options)
//         }
//     }
//     const response = await fetch(url, options);
//     return response.json();
// }

// attachEvents();

//---------------------------------------------------------------------------------------

function attachEvents() {
    document.getElementById('refresh').addEventListener('click', getAllMsg);
    document.getElementById('submit').addEventListener('click', onSendMsg);

}
function onSendMsg() {
    const author = document.querySelector('input[name="author"]');
    const content = document.querySelector('input[name="content"]');

    const body = {
        author: author.value,
        content: content.value
    }
    author.value = '';
    content.value = '';
    createMsg(body)
}

function renderMsg(data) {
    const textArea = document.getElementById('messages');
    const content = Object.values(data).map(entry => `${entry.author}: ${entry.content}`).join('\n');
    textArea.textContent = content;
}


async function getAllMsg() {
    const url = `http://localhost:3030/jsonstore/messenger`;

    const response = await fetch(url);
    const data = await response.json();
    renderMsg(data);
}

async function createMsg(body) {
    const url = `http://localhost:3030/jsonstore/messenger`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    getAllMsg();
}
attachEvents();