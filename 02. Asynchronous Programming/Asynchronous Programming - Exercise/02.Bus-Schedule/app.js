function solve() {
    let stopId = {
        next: 'depot'
    };

    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let label = document.getElementById('info');


    async function depart() {
        departBtn.disabled = true;
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stopId.next}`;
        const res = await fetch(url);

        if (res.status !== 200) {
            label.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
            alert('Wrong data');
        }

        stopId = await res.json();
        label.textContent = `Next stop ${stopId.name}`;
        arriveBtn.disabled = false;
    }

    function arrive() {
        arriveBtn.disabled = true;
        label.textContent = `Arriving at ${stopId.name}`;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();