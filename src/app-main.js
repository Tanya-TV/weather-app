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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°C|°F`;

  let precipitation = Math.round(response.data.main.humidity);
  let precip = document.querySelector("#precip");
  precip.innerHTML = `${precipitation}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} km/h`;
}

let city = "Kyiv";
let apiKey = "3f7457282d9e42883d63642e2c0fa1a0";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
