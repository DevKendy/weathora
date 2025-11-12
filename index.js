const apiKey = "8485eb021b915c427f323ae2577963aa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
// https://api.openweathermap.org/data/2.5/weather?q=enugu&appid=8485eb021b915c427f323ae2577963aa&units=metric

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search div");
const weatherIcon = document.querySelector(".weather-icon");
const app = document.querySelector("#app");
const span = document.querySelector(".span");
const weatherCard = document.querySelector(".card")
const weathora = document.querySelector(".weathora")

const gradients = {
    Clear: "linear-gradient(to bottom, #f6d365, #fda085)",
    Clouds: "linear-gradient(to bottom, #89f7fe, #66a6ff)",
    Rain: "linear-gradient(to bottom, #667db6, #0082c8, #667db6)",
    Thunderstorm: "linear-gradient(to bottom, #232526, #414345)",
    Snow: "linear-gradient(to bottom, #e0eafc, #cfdef3)",
    Drizzle: "linear-gradient(to bottom, #74ebd5, #ACB6E5)",
    Mist: "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
    Smoke: "linear-gradient(135deg, #6e7c7c, #b0b7b7, #d6d8d8)",
    Haze: "linear-gradient(135deg, #d7d2cc, #304352)",
    Fog: "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
    Default: "linear-gradient(to bottom, #43cea2, #185a9d)"
};

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    app.style.background = gradients.Default
    app.style.transition = ".2s ease-in-out linear"

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        app.style.background = gradients.Default
        weatherCard.style.background = gradients.Default;
        weathora.style.background = "transparent";
        console.log("Invalid city name");
        
    }
    else{
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
   
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
            app.style.background = gradients.Clouds
            weatherCard.style.background = gradients.Clouds
            span.textContent = "Cloudy"
            weathora.style.background = "#68b6e7e1";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/sun.png";
            app.style.background = gradients.Clear
            weatherCard.style.background = gradients.Clear
            span.textContent = "Clear";
            weathora.style.background = "#f6d365";

        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rainy-day.png";
            app.style.background = gradients.Rain;
            weatherCard.style.background = gradients.Rain;
            span.textContent = "Raining"
            weathora.style.background = "#667db6";

        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
            app.style.background = gradients.Drizzle;
            weatherCard.style.background = gradients.Drizzle;
            span.textContent = "Drizzle";
            weathora.style.background = "#74ebd5";

        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
            app.style.background = gradients.Mist;
            weatherCard.style.background = gradients.Mist;
            span.textContent = "Mist";
            weathora.style.background = "#bdc3c7";

        }
        else if(data.weather[0].main == "Thunderstorm"){
            weatherIcon.src = "images/thunder.png";
            app.style.background = gradients.Thunderstorm;
            app.style.color = "white"
            weatherCard.style.background = gradients.Thunderstorm;
            span.textContent = "Thunderstorm ⚡"
            weathora.style.background = "#414345";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png";
            app.style.background = gradients.Snow;
            weatherCard.style.background = gradients.Snow;
            span.textContent = "Snowy skies ❄️"
            weathora.style.background = "#e0eafc";
        }

        else if(data.weather[0].main == "Smoke"){
            weatherIcon.src = "images/smoke.png";
            app.style.background = gradients.Smoke;
            weatherCard.style.background = gradients.Smoke;
            span.textContent = "Smoke"
            weathora.style.background = "#6e7c7c";
        }

        else if(data.weather[0].main == "Haze"){
            weatherIcon.src = "images/mist (1).png";
            app.style.background = gradients.Haze;
            weatherCard.style.background = gradients.Haze;
            span.textContent = "Haze"
            weathora.style.background = "#d7d2cc";
        }

        else if(data.weather[0].main == "Fog"){
            weatherIcon.src = "images/fog.png";
            app.style.background = gradients.Fog;
            weatherCard.style.background = gradients.Fog;
            span.textContent = "Fog"
            weathora.style.background = "#bdc3c7";
        }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".weather").style.animation = "fadeIn 0.5s ease-in";
    document.querySelector(".card").style.height = "100%;"
    document.querySelector(".error").style.display = "none";
    console.log("Weather details displayed");

    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
searchBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchBtn.click()
    };
});

checkWeather()