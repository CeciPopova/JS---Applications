async function lockedProfile() {
    let url = 'http://localhost:3030/jsonstore/advanced/profiles';

    let mainElement = document.getElementById('main');
    mainElement.innerHTML = '';

    let res = await fetch(url);
    let data = Object.values(await res.json());
    
    data.forEach((user, index) => {
        let userCard = document.createElement('div');
        userCard.className = 'profile';
        let idNumber = index + 1;
        userCard.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
                              <label>Lock</label>
                              <input type="radio" name="user${idNumber}Locked" value="lock" checked>
                              <label>Unlock</label>
                              <input type="radio" name="user${idNumber}Locked" value="unlock"><br>
                              <hr>
                              <label>Username</label>
                              <input type="text" name="user${idNumber}Username" value="${user.username}" disabled readonly />
                              <div id="user1HiddenFields" style="display:none">
                                  <hr>
                                  <label>Email:</label>
                                  <input type="email" name="user${idNumber}Email" value="${user.email}" disabled readonly />
                                  <label>Age:</label>
                                  <input type="email" name="user${idNumber}Age" value="${user.age}" disabled readonly />
                              </div>
                              <button>Show more</button>`;
        mainElement.appendChild(userCard);

    });
    let buttonElements = document.querySelectorAll('div button');
    for (let i = 0; i < buttonElements.length; i++) {
        let button = buttonElements[i];
        let profileElement = button.parentElement;
        let lockedElement = profileElement.querySelector('input[value="lock"]');
        let hiddenInfoElement = profileElement.querySelector(`#user1HiddenFields`);

        button.addEventListener('click', () => {

            if (!lockedElement.checked && button.textContent == 'Show more') {
                hiddenInfoElement.style.display = 'block';
                button.textContent = 'Hide it';
            } else if (!lockedElement.checked && button.textContent == 'Hide it') {
                hiddenInfoElement.style.display = 'none';
                button.textContent = 'Show more';
            }
        });
    }
}