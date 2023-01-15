async function getInfo() {

  //read input value
  //request to server
  //parse data
  //display data
  //check error

  let stopId = document.getElementById('stopId').value;
  let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
  let stopBusName = document.getElementById('stopName');
  let busesTableElement = document.getElementById('buses');

  try {
    busesTableElement.replaceChildren();
    const res = await fetch(url);

    if (res.status !== 200) {
      throw new Error('Stop ID not found!');
    }
    
    const data = await res.json();
    stopBusName.textContent = data.name;

    console.log(data);
    Object.entries(data.buses).forEach(b => {
      const li = document.createElement('li');
      li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
      busesTableElement.appendChild(li);
    })

  } catch (error) {
    stopBusName.textContent = 'Error';
  }
}