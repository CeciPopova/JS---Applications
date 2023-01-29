document.getElementById('register-form').addEventListener('submit', registerHandler);
document.querySelectorAll("a").forEach(x => x.classList.remove('active'));
document.getElementById('register').classList.add('active');
const errorP = document.querySelector("p.notification");

function registerHandler(e){
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const {email, password, rePassword} = Object.fromEntries(formData);
    
    if (password !== rePassword) {
        errorP.textContent = 'Error';
        setTimeout(()=> {
            errorP.textContent = "";
        },1000)
    }
    onRegister(email,password);
}

async function onRegister(email, password) {
    const url = `http://localhost:3030/users/register`;

    const body = {
        email,
        password
    }
    const header = getHeader('POST', body);
    try{
    const response = await fetch(url, header);
    const data = await response.json();
    if (data.code !== 200) {
        throw new Error(data.message);
    }
    return data;
    }catch(e){

        errorP.textContent = e;
        setTimeout(()=> {
            errorP.textContent = "";
        },1000)
    }
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}