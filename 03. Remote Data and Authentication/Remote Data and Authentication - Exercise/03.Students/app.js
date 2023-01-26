async function solve() {
    const url = `http://localhost:3030/jsonstore/collections/students`;

    const table = document.querySelector('#results tbody');

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(s => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facultyNumber = s.facultyNumber;
        const grade = Number(s.grade);
        const id = s._id;

        const tr = document.createElement('tr');
        tr.setAttribute('id', id);

        const firstNameSell = tr.insertCell(0);
        firstNameSell.innerText = firstName;

        const lastNameSell = tr.insertCell(1);
        lastNameSell.innerText = lastName;

        const facultyNumberSell = tr.insertCell(2);
        facultyNumberSell.innerText = facultyNumber;

        const gradeSell = tr.insertCell(3);
        gradeSell.innerText = grade;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'X';
        deleteBtn.style.width = '100%';
        deleteBtn.style.color = 'red';

        deleteBtn.addEventListener('click', deleteStudent);

        const deleteBtnCell = tr.insertCell(4);
        deleteBtnCell.appendChild(deleteBtn);

        table.appendChild(tr);
    })

    async function deleteStudent(e) {
        const id = e.target.parentNode.parentNode.id;
        e.target.parentNode.parentNode.remove();

        const deleteResponse = await fetch(`${url}/${id}`, {
            method:'DELETE'
        });
    }

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onClickSubmit);

    async function onClickSubmit(e) {
        e.preventDefault();

        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (isNaN(gradeInput.value)) {
            return alert('Wrong grade format!');
        }

        if (firstNameInput.value !== '' &&
        lastNameInput.value !== '' &&
        facultyNumberInput.value !== '' &&
        gradeInput.value !== '') {
            const response = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type':'aplication/json'},
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    facultyNumber: facultyNumberInput.value,
                    grade: Number(gradeInput.value)
                })
            });
    
            const tr = document.createElement('tr');
    
            const firstNameCell = tr.insertCell(0);
            firstNameCell.innerText = firstNameInput.value;
    
            const lastNameCell = tr.insertCell(1);
            lastNameCell.innerText = lastNameInput.value;
    
            const facultyNumberCell = tr.insertCell(2);
            facultyNumberCell.innerText = facultyNumberInput.value;
    
            const gradeSell = tr.insertCell(3);
            gradeSell.innerText = gradeInput.value;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'X';
            deleteBtn.style.width = '100%';
            deleteBtn.style.color = 'red';
    
            deleteBtn.addEventListener('click', deleteStudent);
    
            const deleteBtnCell = tr.insertCell(4);
            deleteBtnCell.appendChild(deleteBtn);
    
            table.appendChild(tr);
        }
       
        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }
}
solve();