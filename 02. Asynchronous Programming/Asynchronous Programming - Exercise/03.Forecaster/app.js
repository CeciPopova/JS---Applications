function attachEvents() {
    let forecastDiv = document.getElementById('forecast');
    let currentDiv = document.getElementById('current');
    let upcomingDiv = document.getElementById('upcoming');
    let url = `http://localhost:3030/jsonstore/forecaster/locations`;

    let currentConditionsDiv = createElement('div', '', ['class', 'forecasts']);
    let forcastInfoDiv = createElement('div', '', ['class', 'forecast-info']);

    let submitBtn = document.getElementById('submit');

    const symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    };

    submitBtn.addEventListener('click', onClick);
    async function onClick(e) {
      currentConditionsDiv.innerHTML = '';
      forcastInfoDiv.innerHTML = '';

        let locationElement = document.querySelector('#location');
        let location = locationElement.value;
        forecastDiv.style.display = 'block';
        try {
            
            const res = await fetch(url);
            const arrData = await res.json();

            let data = arrData.find(e => e.name === location);


            let currentConditions = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${data.code}`);
            let currentData = await currentConditions.json();

            let currentConditionsSpan = createElement('span', symbols[currentData.forecast.condition], ['class', 'condition symbol']);
            let conditionsSpan = createElement('span', '', ['class', 'condition']);
            let span1 = createElement('span', currentData.name, ['class', 'forecast-data']);
            let span2 = createElement('span', `${currentData.forecast.low}°/${currentData.forecast.high}°`, ['class', 'forecast-data']);
            let span3 = createElement('span', currentData.forecast.condition, ['class', 'forecast-data']);
            conditionsSpan.appendChild(span1);
            conditionsSpan.appendChild(span2);
            conditionsSpan.appendChild(span3);
            currentConditionsSpan.appendChild(conditionsSpan);
            currentConditionsDiv.appendChild(currentConditionsSpan);
            currentDiv.appendChild(currentConditionsDiv);


            let treeDayForecast = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${data.code}`);
            let threeDaysData = await treeDayForecast.json();

            threeDaysData.forecast.forEach(day => {
               
                let forecastInfoSpan = createElement('span', '', ['class', 'upcoming']);
                let symbolSpan = createElement('span', symbols[day.condition], ['class', 'symbol']);
                let tempSpan = createElement('span',`${day.low}°/${day.high}°`, ['class', 'forecast-data']);
                let conditionSpan = createElement('span',day.condition, ['class', 'forecast-data']);
                forecastInfoSpan.appendChild(symbolSpan);
                forecastInfoSpan.appendChild(tempSpan);
                forecastInfoSpan.appendChild(conditionSpan);
                forcastInfoDiv.appendChild(forecastInfoSpan);
               
            });
            upcomingDiv.appendChild(forcastInfoDiv);
            locationElement.value = '';

        } catch (error) {
            currentConditionsDiv.innerHTML = '';
            forcastInfoDiv.innerHTML = '';
          
            forecastDiv.style.display = 'block';
            let errorSpan = document.createElement('span');
            errorSpan.textContent = 'Error';
            forecastDiv.appendChild(errorSpan);

        }
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

attachEvents();