const API_KEY = "cee74db3c17638132c0bf4a8cf1bf0c6";

// 날씨 DOM
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const weatherContainer = document.querySelector("#weather-container");
const weatherImage = document.querySelector("#weather-container img");

// 현재 위치
navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);
  getWeather(lat, lon);
});

// 날씨 api
const getWeather = async (lat, lon) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  weatherRender(data);
};

const weatherRender = (data) => {
  city.innerText = data.name;
  temp.innerText = data.main.temp;
  description.innerText = data.weather[0].description;

  const weatherIcon = data.weather[0].icon;
  weatherImage.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

  const weatherCondition = data.weather[0].main.toLowerCase();
  setWeatherImage(weatherCondition);
};

const setWeatherImage = (condition) => {
  let imageUrl = "";
  switch (condition) {
    case "clear":
      imageUrl = "./image/clear.gif";
      break;
    case "rain":
      imageUrl = "./image/rain.gif";
      break;
    case "clouds":
      imageUrl = "./image/clouds.gif";
      break;
    case "snow":
      imageUrl = "./image/snow.gif";
      break;
    case "thunderstorm":
      imageUrl = "./image/thunderstorm.gif";
      break;
    default:
      imageUrl = "./image/gradi.avif";
  }

  weatherContainer.style.backgroundImage = `url(${imageUrl})`;
  weatherContainer.style.backgroundSize = "cover";
  weatherContainer.style.backgroundPosition = "center";
};
