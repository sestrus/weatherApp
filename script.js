"use strict";
const geoLoc = document.getElementById("geoLoc");
const mainPage = document.querySelector(".mainPage");
const moreInfo = document.querySelector(".moreInfo");
const overlay = document.querySelector(".overlay");
const exitMoreInfo = document.querySelector(".close-modal");
const d = new Date();
let hour = d.getHours();
console.log(hour);
mainPage.classList.add("hidden");

mainPage.addEventListener("click", () => {
  moreInfo.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
overlay.addEventListener("click", () => {
  moreInfo.classList.add("hidden");
  overlay.classList.add("hidden");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    moreInfo.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});
exitMoreInfo.addEventListener("click", () => {
  moreInfo.classList.add("hidden");
  overlay.classList.add("hidden");
});

const getLocation = () => {
  if (navigator.geolocation) {
    let currentPosition = navigator.geolocation.getCurrentPosition(
      successFunction,
      errorFunction
    );
  }
};

const successFunction = (position) => {
  mainPage.classList.remove("hidden");

  mainPage.addEventListener("click", () => {
    moreInfo.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl =
    "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;

  async function getWeather() {
    let myObject = await fetch(apiUrl);
    let weatherData = await myObject.json();
    let cityName = weatherData.name;
    let sunrise = weatherData.sys.sunrise;
    let temperature = Math.round(weatherData.main.temp);
    let pressure = weatherData.main.pressure;
    let feelsLike = weatherData.main.feels_like;
    let weatherDescription = weatherData.weather[0].description;
    let timeZone = weatherData.timezone;
    console.log(timeZone);
    console.log(weatherData);

    const sunriseTime = (rise) => {
      let sunriseHour = Math.floor(((rise % 86400) + timeZone) / 3600);
      let sunriseMinute =
        (((sunrise % 86400) + timeZone) / 3600 -
          Math.floor(((rise % 86400) + timeZone) / 3600)) *
        60;
      sunriseMinute.toFixed(2);
      let sunriseFullTime = `${sunriseHour}:${Math.ceil(sunriseMinute)}`;
      document.getElementById(
        "sunrise"
      ).innerHTML = `Sunrise: ${sunriseFullTime}`;
      return sunriseFullTime;
    };
    sunriseTime(sunrise);

    const airPressure = (press) => {
      document.getElementById("pressure").innerHTML = `Pressure: ${press} hPa`;
    };

    const perceivedTemp = (perceived) => {
      document.getElementById(
        "perceived"
      ).innerHTML = `Perceived Temperature: ${Math.round(perceived)}°C`;
    };

    const weatherDesc = (desc) => {
      document.getElementById("description").innerHTML = `Description: ${desc}`;
    };
    weatherDesc(weatherDescription);
    perceivedTemp(feelsLike);
    airPressure(pressure);

    if (weatherData.weather[0]) {
      let sky = weatherData.weather[0].main;
      switch (sky) {
        case "Clear":
          if (hour < 5 || hour > 20) {
            document.body.style.removeProperty("background");
            document.body.style.backgroundImage =
              "url('img/night-clear-sky.jpg')";
          } else {
            document.body.style.background =
              "linear-gradient(to bottom, #00ccff, #97eaff)";
          }
          break;

        case "Clouds":
          document.body.style.removeProperty("background");
          if (hour < 5 || hour > 20) {
            document.body.style.backgroundImage = "url('img/clouds-night.jpg')";
          } else {
            document.body.style.backgroundImage = "url('img/clouds.jpeg')";
          }
          break;

        case "Haze":
          document.body.style.removeProperty("background");
          if (hour < 5 || hour > 20) {
            document.body.style.backgroundImage = "url('img/Haze-night.jpg')";
          } else {
            document.body.style.backgroundImage = "url('img/haze.jpeg')";
          }
          break;

        case "Rain":
          document.body.style.removeProperty("background");
          if (hour < 5 || hour > 20) {
            document.body.style.backgroundImage = "url('img/rain-night.jpg')";
          } else {
            document.body.style.backgroundImage = "url('img/rain.jpg')";
          }
          break;

        case "Storm":
          document.body.style.removeProperty("background");
          if (hour < 5 || hour > 20) {
            document.body.style.backgroundImage = "url('img/Storm-night.jpg')";
          } else {
            document.body.style.backgroundImage = "url('img/Storm.jpg')";
          }
          break;

        default:
          document.body.style.removeProperty("background");
          document.body.style.background =
            "linear-gradient(to bottom, #00ccff, #97eaff)";
      }
    }

    temperature.toString();
    temperature = temperature + " °C";

    document.getElementById("temp").innerHTML = temperature;
    document.getElementById("geoLoc").innerHTML = cityName;
  }
  getWeather();
};
const errorFunction = () => {
  alert("Geolocation is not supported by this browser.");
  document.getElementById("errorHeader").innerHTML =
    "Geolocation is not supported by this browser.<br> Allow geolocation on your computer to get access to the site";
};

window.addEventListener("load", () => {
  getLocation();
});
