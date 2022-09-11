//Main Current Date

let now = new Date();

let mainDate = document.querySelector("#main-date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];

mainDate.innerHTML = `${day} ${hours}:${minutes} <br /> ${date}.${month}.${year}`;

//Searching City
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchingCity = document.querySelector("#searching-city");
  searchingCity.innerHTML = `${searchInput.value}`;

  let city = searchingCity.innerHTML;
  let apiKey = "3f7457282d9e42883d63642e2c0fa1a0";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#form");
form.addEventListener("submit", showCity);

//works on current date(может удалю)
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="col">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 4) {
      forecastHTML =
        forecastHTML +
        `
                <div class="fri">
                  ${formatDay(forecastDay.dt)}
                   
                  <br />
                  <span class="icon-small">
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt="sun-cloud"  class="sun-cloud" />
                  </span>
                  <span class="degree"> ${Math.round(
                    forecastDay.temp.day
                  )}<small> °C </small> </span>
                </div>
                `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3f7457282d9e42883d63642e2c0fa1a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = temperature;

  let precipitation = Math.round(response.data.main.humidity);
  let precip = document.querySelector("#precip");
  precip.innerHTML = `${precipitation}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} km/h`;

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  //works on current date (может удалю)
  //let dateElement = document.querySelector("#date");
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("h2");
  //remove the active class the celsius link
  celsiusLink.classList.remove("active");

  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");

  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let city = "Kyiv";
let apiKey = "3f7457282d9e42883d63642e2c0fa1a0";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

//displayForecast();
