const apiKey = '240bcc40853d47b4992f55f0704866fa';  // Your Weatherbit API key

function getWeather() {
    const weatherInfo = document.getElementById('weatherInfo');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (!data || !data.data || data.data.length === 0) {
                        weatherInfo.innerHTML = `<p>Error fetching weather data.</p>`;
                        return;
                    }

                    const weather = data.data[0];
                    const temperature = weather.temp;
                    const description = weather.weather.description;
                    const humidity = weather.rh;
                    const windSpeed = weather.wind_spd;

                    weatherInfo.innerHTML = `
                        <h2>${weather.city_name}</h2>
                        <p><strong>Temperature:</strong> ${temperature} °C</p>
                        <p><strong>Description:</strong> ${description}</p>
                        <p><strong>Humidity:</strong> ${humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                    `;
                })
                .catch(error => {
                    weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
                });
        }, error => {
            weatherInfo.innerHTML = `<p>Geolocation is not available or permission denied.</p>`;
        });
    } else {
        weatherInfo.innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
    }
}

// Call getWeather function on page load
getWeather();
