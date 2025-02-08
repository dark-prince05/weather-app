import "./style.css";

async function getWeatherDetails(countryName) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${countryName}?key=WQWBDZJHXSTR5D34NHMPGC3UB`,
      { mode: "cors" },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}
getWeatherDetails("usa");

function updateDetails() {
  const input = document.querySelector("#search");
  const searchBtn = document.querySelector("#search-btn");
  const container = document.querySelector(".weather-display");

  searchBtn.addEventListener("click", () => {
    const city = input.value;
    container.textContent = "";

    const loading = document.createElement("div");
    loading.id = "loading";
    loading.textContent = "loading...";
    container.append(loading);
    const cityName = document.createElement("div");
    const weatherDetails = document.createElement("div");
    const temperature = document.createElement("div");
    const description = document.createElement("div");

    getWeatherDetails(city)
      .then((data) => {
        cityName.textContent = `City Name: ${data.resolvedAddress}`;
        temperature.textContent = `Temperature: ${data.currentConditions.temp}°C`;
        weatherDetails.textContent = `Weather:  ${data.currentConditions.conditions}`;
        description.textContent = `Description: ${data.description}`;
        container.removeChild(loading);
        container.append(cityName);
        container.append(temperature);
        container.append(weatherDetails);
        container.append(description);
      })
      .catch((error) => console.log("Error:", error));
  });
}

updateDetails();
