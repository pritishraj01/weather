const url = "https://api.openweathermap.org/data/2.5/weather?";
const button = document.querySelector("#report-btn");
const para = document.querySelector("#para");
const selectCity = document.querySelector("#select-city");
const modeBtn = document.querySelector("#mode");
const body = document.querySelector("body");
const clock = document.querySelector(".clock");

const updateClock = () => {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let second = now.getSeconds();

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  second = String(second).padStart(2, "0");

  const currTime = `${hours}:${minutes}:${second}`;
  clock.innerText = currTime;
};

setInterval(updateClock, 1000);
updateClock();

for (let state of indianStates) {
  let newOption = document.createElement("option");
  newOption.innerText = state;
  newOption.value = state;
  selectCity.append(newOption);
}

const weather = async () => {
  try {
    const URL = `${url}q=${selectCity.value}&appid=e958aecd5543d9c57b55ccc3b54f0582&units=metric`;
    let response = await fetch(URL);
    let data = await response.json();

    const temp = data.main.temp.toFixed(1);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    para.innerText = `Temprature: ${temp}°C
  Weather: ${description}
  Humidity: ${humidity} %
  Wind Speed: ${windSpeed} m/s`;
  } catch (error) {
    para.innerText = "Sorry for Inconvenience,Weather report is not Available.";
  }
};

button.addEventListener("click", weather);

let mode = "light";

modeBtn.addEventListener("click", () => {
  if (mode === "light") {
    mode = "dark";
    body.style.backgroundColor = "#313638";
    body.style.color = "#E8E9EB";
    modeBtn.style.backgroundColor = "white";
    modeBtn.style.color = "black";
  } else {
    mode = "light";
    body.style.backgroundColor = "#E0DFD5";
    body.style.color = "black";
    modeBtn.style.backgroundColor = "black";
    modeBtn.style.color = "white";
  }
});
