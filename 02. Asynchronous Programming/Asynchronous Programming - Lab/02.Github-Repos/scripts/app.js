function loadRepos() {
	const username = document.getElementById('username').value;
	const list = document.getElementById('repos');

	fetch(`https://api.github.com/users/${username}/repos`)
		.then(handleResponse)
		.then(displayRepos)
		.catch(handleErrors);

	function handleResponse(res) {
		if (res.ok == false) {
			console.log(res);

			throw new Error(`${res.status} ${res.statusText}`);
		}
		return res.json();
	}
	
	function displayRepos(data) {
		list.innerHTML = '';

		for (const repo of data) {
			let item = document.createElement('li');
			let anchor = document.createElement('a');
			console.log(anchor);
			anchor.href = repo.html_url;
			anchor.target = '_blank';
			anchor.textContent = repo.full_name;

			item.appendChild(anchor);

			list.appendChild(item);
		}
	}

	function handleErrors(err) {
		repos.innerHTML = '';
		let item = document.createElement('li');
		item.textContent = err.message;
		list.appendChild(item);
	}
}
	
		
