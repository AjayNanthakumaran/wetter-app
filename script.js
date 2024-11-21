// NAVBAR Uhrzeit / Datum / Zeitzone //
// Uhrzeit KI
function currentTime() {
    var jetzt = new Date(),
        h = jetzt.getHours(),
        m = jetzt.getMinutes();
        m = fuehrendeNull(m);

    document.getElementById('CurrentTime').innerHTML = h + ':' + m;
    setTimeout(currentTime, 500);
}
function fuehrendeNull(zahl) {
    zahl = (zahl < 10 ? '0' : '' ) + zahl;  
    return zahl;
}


document.getElementById("city").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Verhindert das Standardverhalten
        fetchWeather(); // Ruft die Funktion getWeather auf
    }
});

// Zeitzone



////////////////////////////////
// Alle Funktionen ausführen // 
document.addEventListener("DOMContentLoaded", function() {
    currentTime();
});


function fetchWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert("Bitte geben Sie eine Stadt ein.");
        return;
    }

    const apiKey = 'bab281d79e5f1e9755a68d754cc313e7';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    Promise.all([
        fetch(currentWeatherUrl).then(response => response.json()),
        fetch(forecastUrl).then(response => response.json())
    ])
    .then(([currentData, forecastData]) => {
        displayWeather(currentData);
        displayHourlyForecast(forecastData.list);
    })
    .catch(error => {
        console.error('Fehler:', error);
    });

}
function triggerEnter() {
    const startCity = "Düsseldorf";

    const inputElement = document.getElementById("city");
    inputElement.value = startCity;

    const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                fetchWeather();
            }
        }
    });

    inputElement.dispatchEvent(enterEvent);
}
triggerEnter();

function displayWeather(data) {

    //Outputs
    const weatherOutput = document.getElementById('temp-div');
    const weatherDescription = document.getElementById('weather-description');
    const weathercountry = document.getElementById('weather-country');
    const maxtemp = document.getElementById('max-temp');
    const mintemp = document.getElementById('min-temp');
    const feelslike = document.getElementById('feels-like');
    const sunrisediv = document.getElementById('sunrise');
    const sunsetdiv = document.getElementById('sunset');
    //Icons
    const iconCode = data.weather[0].icon;
    var iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const weatherIcon = document.getElementById('weather-icon');
    
    const sunrise = data.sys.sunrise;
    const timezone = data.timezone;
    const Truesunrise = new Date((timezone + sunrise) * 1000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const sunset = data.sys.sunset;
    const Truesunset = new Date((timezone + sunset) * 1000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const windspeeddiv = document.getElementById('windspeed');
    const windspeed = data.wind.speed;
    const humidtiydiv = document.getElementById('humidity');
    const cloudinessdiv = document.getElementById('cloud');
    const visiblitydiv = document.getElementById('visibility');
    const visibility = data.visibility / 1000;
    const windpressurediv = document.getElementById('wind-pressure');
    document.getElementById('weather-city').innerHTML = data.name;

    console.log(data);


    if (data && data.weather && data.main) {

        if(iconCode == '01d'){
            document.body.style.backgroundImage = "url('../img/clearsky.png')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s';
            iconURL = "img/sun-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 

        }
        else if(iconCode == '01n'){
            document.body.style.backgroundImage = "url('../img/clearsky-night.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/moon-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '02d'){
            document.body.style.backgroundImage = "url('../img/few-clouds.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/few-clouds-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '02n'){
            document.body.style.backgroundImage = "url('img/cloudy-night.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/cloud-moon-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '03d'){
            document.body.style.backgroundImage = "url('img/few-clouds.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/cloud-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '03n'){
            document.body.style.backgroundImage = "url('img/cloudy-night.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/cloud-night.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '04d'){
            document.body.style.backgroundImage = "url('img/few-clouds.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/broken-clouds-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '04n'){
            document.body.style.backgroundImage = "url('img/cloudy-night.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/broken-clouds-icon-night.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '09d'){
            document.body.style.backgroundImage = "url('img/drops-of-rain-on-glass-838815210-5a823cc0a18d9e0036e325e2.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/shower-rain-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if( iconCode == '09n'){
            document.body.style.backgroundImage = "url('img/rain-night.jpeg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/shower-rain-night.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '10d'){
            document.body.style.backgroundImage = "url('img/lightrain.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/rain-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '10n'){
            document.body.style.backgroundImage = "url('img/rain-night.jpeg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/night-rain-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '11d'){
            document.body.style.backgroundImage = "url('img/thunder.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/Thunderstrom-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '11n'){
            document.body.style.backgroundImage = "url('img/thunder-night.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/Thunderstrom-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '13d'){
            document.body.style.backgroundImage = "url('img/snow.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/snowflake.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if( iconCode == '13n'){
            document.body.style.backgroundImage = "url('img/snow-night.jpeg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/snowflake.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        else if(iconCode == '50d'){
            document.body.style.backgroundImage = "url('img/mist.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/mist-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }      
        else if(iconCode == '50n'){
            document.body.style.backgroundImage = "url('img/mist-night.jpeg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/mist-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }      
        else{
            document.body.style.backgroundImage = "url('img/clearsky.png')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = '.4s'
            iconURL = "img/moon-icon.png";
            weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
            weatherIcon.style.display = 'block'; 
        }
        
    } else {
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block'; // Ausgabe anzeigen
    }

    weatherOutput.innerHTML = `${data.main.temp}`;
    weatherOutput.style.display = 'block'; 

    weatherDescription.innerHTML = `${data.weather[0].description}`;
    weatherDescription.style.display = 'block'; 

    weathercountry.innerHTML = `${data.sys.country}`;
    weathercountry.style.display = 'block'; 

    maxtemp.innerHTML = `${data.main.temp_max}°C`;
    maxtemp.style.display = 'block'; 

    mintemp.innerHTML = `${data.main.temp_min}°C`;
    mintemp.style.display = 'block'; 

    feelslike.innerHTML = `${data.main.feels_like}°C`;
    feelslike.style.display = 'block'; 

    sunrisediv.innerHTML = `${Truesunrise}`;
    sunrisediv.style.display = 'block'; 

    sunsetdiv.innerHTML = `${Truesunset}`;
    sunsetdiv.style.display = 'block';

    windspeeddiv.innerHTML = `${windspeed} m/s`;
    windspeeddiv.style.display = 'block'; 
    
    weatherIcon.innerHTML = `<img src="${iconURL}" alt="">`;
    weatherIcon.style.display = 'block'; 

    humidtiydiv.innerHTML = `${data.main.humidity} %`;
    humidtiydiv.style.display = 'block'; 

    cloudinessdiv.innerHTML = `${data.clouds.all} %`;
    cloudinessdiv.style.display = 'block'; 

    windpressurediv.innerHTML = `${data.main.pressure} hPa`;
    windpressurediv.style.display = 'block'; 
}


function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forcast');
    hourlyForecastDiv.innerHTML = ''; 

    const nextHours = hourlyData.slice(0, 8);

    nextHours.forEach(item => {
        const dt = new Date(item.dt * 1000); // Konvertiert Unix-Zeit in ein Datum
        const hour = dt.getHours();
        const temperature = item.main.temp; // Temperatur in °C umrechnen
        const weatherDescription = item.weather[0].description;
        const iconCode = item.weather[0].icon;
        let iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        if(iconCode == '01d'){
            iconURL = "img/sun-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '01n'){
            iconURL = "img/moon-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '02d'){
            iconURL = "img/few-clouds-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '02n'){
            iconURL = "img/cloud-moon-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '03d'){
            iconURL = "img/cloud-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '03n'){
            iconURL = "img/cloud-night.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '04d'){
            iconURL = "img/broken-clouds-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '04n'){
            iconURL = "img/broken-clouds-icon-night.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '09d'){
            iconURL = "img/shower-rain-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '09n'){
            iconURL = "img/shower-rain-night.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '10d'){
            iconURL = "img/rain-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '10n'){
            iconURL = "img/night-rain-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '11d' || iconCode == '11n'){
            iconURL = "img/Thunderstrom-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '13d' || iconCode == '13n'){
            iconURL = "img/snowflake.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }
        else if(iconCode == '50d' || iconCode == '50n'){
            iconURL = "img/mist-icon.png";
            const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        }

        // Erzeugt ein HTML-Element für jede Stunde
        const hourlyItemHtml = `
            <div class="hourly-item">
                <p>${hour}:00</p>
                <img src="${iconURL}">
                    <p>${weatherDescription}</p>
                    <p class="temp-end">${temperature}°C</p>
            </div>
        `;
        // Fügt das Element dem Container hinzu
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}


