function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`http://127.0.0.1:5000/weather?city=${city}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        resultDiv.innerHTML = `<p>${data.error}</p>`;
      } else {
        resultDiv.innerHTML = `
          <h2>${data.city}</h2>
          <p>${data.description}</p>
          <p>🌡️ ${data.temperature} °C</p>
          <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="weather icon">
        `;
      }
    })
    .catch(err => {
      console.error("Error:", err);
      resultDiv.innerHTML = `<p>Error fetching weather data.</p>`;
    });
}

document.getElementById("getWeather").addEventListener("click", getWeather);
