const APIKey = "47625da06d634d50a34131956240412";
const baseURL = "https://api.weatherapi.com/v1/forecast.json";

const findInput = document.querySelector("#findInput");
const btnFind = document.querySelector("#btnFind");
const forecastContainer = document.querySelector("#forecast");

async function fetchWeather(city) {
  try {
    const response = await fetch(`${baseURL}?key=${APIKey}&q=${city}&days=3`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch weather data.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Render Weather Data
async function displayWeather() {
  const city = findInput.value.trim();

  const data = await fetchWeather(city);

  const { location, forecast: forecastData } = data;
  forecastContainer.innerHTML = ""; // Clear previous data

  forecastData.forecastday.forEach((day) => {
    const dayName = new Date(day.date).toLocaleDateString("en-US", {
      weekday: "short",
    });

    const card = `
      <div class="col-lg-4 mb-4">
        <div class="card h-100 rounded-3">
          <div class="card-header  text-center  text-white">
            <h5>${dayName}</h5>
            <p>${new Date(day.date).toLocaleDateString()}</p>
          </div>
          <div class="card-body text-white  text-center">
            <h6 class="location text-white">${location.name}, ${
      location.country
    }</h6>
            <p class="temperature text-white">${day.day.maxtemp_c}°C / ${
      day.day.mintemp_c
    }°C</p>
            <img src="${day.day.condition.icon}" alt="Weather Icon" />
            <p class="condition text-white">${day.day.condition.text}</p>
          </div>
        </div>
      </div>
    `;
    forecastContainer.innerHTML += card;
  });
}

btnFind.addEventListener("click", displayWeather);

findInput.addEventListener("input", function () {
  const city = findInput.value.trim();
  if (city) {
    displayWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});