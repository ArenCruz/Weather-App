const key = process.env.WEATHER_API_KEY;
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

require('dotenv').config();
console.log(process.env.WEATHER_API_KEY)
const search = document.getElementById('searchBar');
const btn = document.getElementById('btn');
let icon = document.getElementsByClassName('icon')[0]; 
const weatherUpdate = async (loc) => {
    try{
        let response = await fetch(url +loc+ `&appid=${key}`);
        //check response if ok na
        if(!response.ok){
            throw new Error('Network response in not ok')
        }
        const data = await response.json()
        console.log(data);
        document.getElementById('temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.getElementById('loc').innerHTML = data.name;
        document.getElementById('country').innerHTML = data.sys.country;
        let country = data.sys.country;
        document.getElementById('percent').innerHTML = data.main.humidity + "%";
        document.getElementById('speed').innerHTML = data.wind.speed + "km/h";
        document.getElementById('feelsNum').innerHTML = Math.round(data.main.feels_like) + "°c";
        let lat = data.coord.lat;
        let lon = data.coord.lon;
    
        if(data.weather[0].main == "Drizzle"){
            icon.src = "Rain_light.png";
        }
        else if(data.weather[0].main == "Rain"){
            icon.src = "Rain_fill.png";
        }
        else if(data.weather[0].main == "Clouds"){
            icon.src = "Cloud_duotone.png";
        }
        else if(data.weather[0].main == "Mist"){
            icon.src = "haze.png";
        }
        else if(data.weather[0].main == "Clear"){
            icon.src = "Sunlight_light.png"
        }
    }
    catch(error){
        console.error("There has been a problem with your fetch operation.");
    }
}



btn.addEventListener("click", ()=>{
    weatherUpdate(search.value)
})



