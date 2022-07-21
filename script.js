'use strict';
const geoLoc = document.getElementById("geoLoc");
const mainPage = document.querySelector(".mainPage");
const moreInfo = document.querySelector(".moreInfo");
const overlay = document.querySelector('.overlay');
const exitMoreInfo = document.querySelector('.close-modal');
mainPage.classList.add('hidden')

mainPage.addEventListener("click", ()=>{
  moreInfo.classList.remove('hidden');
  overlay.classList.remove('hidden');
})
overlay.addEventListener("click", ()=>{
  moreInfo.classList.add('hidden');
  overlay.classList.add('hidden');
})
document.addEventListener('keydown', (e)=>{
  if(e.key=== 'Escape'){
    moreInfo.classList.add('hidden');
    overlay.classList.add('hidden');
  }
})
exitMoreInfo.addEventListener('click',()=>{
  moreInfo.classList.add('hidden');
  overlay.classList.add('hidden');
})


const getLocation = () => {
  if (navigator.geolocation) {
   let currentPosition = navigator.geolocation.getCurrentPosition(successFunction,errorFunction);
  } 
}

const successFunction = (position) => {
  mainPage.classList.remove('hidden')

  mainPage.addEventListener("click", ()=>{
    moreInfo.classList.remove('hidden');
    overlay.classList.remove('hidden');
  })


  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon; 
  console.log(lat, lon)


  async function getWeather(){
    let myObject = await fetch(apiUrl);
    let weatherData = await myObject.json();    
    let cityName = weatherData.name
    let temperature = Math.round(weatherData.main.temp)
if(weatherData.weather[0]){
  let sky = weatherData.weather[0].main;
  console.log(sky)
  switch(sky){
    case "Clear":
     document.body.style.background = "linear-gradient(to bottom, #00ccff, #97eaff)";
      break;
  
    case "Clouds":
      document.body.style.removeProperty('background');
    document.body.style.backgroundImage= "url('img/clouds.jpeg')";

    break;  
  }
}
  

    temperature.toString();
    temperature = temperature +" °C"



    document.getElementById('temp').innerHTML = temperature
    document.getElementById('geoLoc').innerHTML = cityName;
    console.log(weatherData)
  
  }
  getWeather();
}
const errorFunction = () => {


  alert("Geolocation is not supported by this browser.");
  document.getElementById('errorHeader').innerHTML = "Geolocation is not supported by this browser.<br> Allow geolocation on your computer to get access to the site"
  
}

window.addEventListener('load', ()=>{
getLocation();

})