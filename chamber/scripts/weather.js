
const weatherApiKey = "39a93938e81e6967af92542761303653";
const weatherLatitude = -34.17;
const weatherLongitude = -70.74;

const temperatureElement = document.querySelector("#weather-temperature");
const descriptionElement = document.querySelector("#weather-description");
const forecastContainer = document.querySelector("#forecast-container");

const weatherParameters = new URLSearchParams({
    lat: weatherLatitude,
    lon: weatherLongitude,
    appid: weatherApiKey,
    units: "metric",
    lang: "en"
});

async function requestWeather(endpoint) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/${endpoint}?${weatherParameters}`
    );

    if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
    }

    return response.json();
}

async function displayCurrentWeather() {
    try {
        const data = await requestWeather("weather");

        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
    } catch (error) {
        temperatureElement.textContent = "Weather unavailable";
        descriptionElement.textContent = "";
        console.error("Current weather error:", error);
    }
}

async function displayForecast() {
    try {
        const data = await requestWeather("forecast");
        const timezone = data.city.timezone;

        const localDate = (timestamp) =>
            new Date((timestamp + timezone) * 1000)
                .toISOString()
                .slice(0, 10);

        const today = localDate(Math.floor(Date.now() / 1000));
        const dailyForecasts = new Map();

        data.list.forEach((item) => {
            const date = localDate(item.dt);

            if (date <= today) return;

            const localHour = new Date(
                (item.dt + timezone) * 1000
            ).getUTCHours();

            const distanceFromNoon = Math.abs(localHour - 12);
            const previous = dailyForecasts.get(date);

            if (!previous || distanceFromNoon < previous.distance) {
                dailyForecasts.set(date, {
                    temperature: item.main.temp,
                    distance: distanceFromNoon
                });
            }
        });

        const selectedDays = [...dailyForecasts.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(0, 3);

        if (selectedDays.length !== 3) {
            throw new Error("Incomplete forecast");
        }

        const fragment = document.createDocumentFragment();

        selectedDays.forEach(([date, forecast]) => {
            const card = document.createElement("div");
            card.className = "forecast-day";

            const heading = document.createElement("h4");
            heading.textContent = new Date(
                `${date}T12:00:00Z`
            ).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                timeZone: "UTC"
            });

            const temperature = document.createElement("p");
            temperature.textContent = `${Math.round(forecast.temperature)}°C`;

            card.append(heading, temperature);
            fragment.append(card);
        });

        forecastContainer.replaceChildren(fragment);
    } catch (error) {
        forecastContainer.textContent = "Forecast unavailable.";
        console.error("Forecast error:", error);
    }
}

if (weatherApiKey === "YOUR_OPENWEATHERMAP_API_KEY") {
    temperatureElement.textContent = "API key required";
    forecastContainer.textContent = "Configure OpenWeatherMap.";
} else {
    displayCurrentWeather();
    displayForecast();
}
