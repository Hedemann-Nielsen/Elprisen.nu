import { getData } from "./controller.js";
const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1; 
const day = today.getDate();

const priceEast = 'DK2';
// const priceWest = "DK1";

const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceEast}.json`;


// History view
//dato indput felt
const dateIdput = document.querySelector('input[type="date"]');
dateIdput.value = `${year}-${month}-${day}`;

// min date
const dateMin = day - 7;
const dateMinControl = document.querySelector('input[type="date"]');
dateMinControl.min = `${year}-${month}-${dateMin}`;

//max date
const dateMax = document.querySelector('input[type="date"]');
dateMax.max = `${year}-${month}-${day}`;

//dato click på icon
document.addEventListener('DOMContentLoaded', () => {
    const calendarIcon = document.getElementById('calendarIcon');
    const dateInput = document.getElementById('dateInput');
  
    calendarIcon.addEventListener('click', () => {
      dateInput.active=true;
    });
});

// opdatere HTML-elementet med den valgte dato fra indput feltet
const dateInput = document.getElementById('dateInput');
const selectedDateElement = document.getElementById('selectedDate');

dateInput.addEventListener('change', () => {
  const selectedDate = dateInput.value;
  selectedDateElement.innerHTML = ` Elpriserne d. ${selectedDate}`;
});


// Lyt efter ændringer i datofeltet
dateInput.addEventListener('change', () => {
  const selectedDate = dateInput.value;
  selectedDateElement.innerHTML = `Elpriserne d. ${selectedDate}`;
  const [selectedYear, selectedMonth, selectedDay] = selectedDate.split('-');
  const selectedUrl = `https://www.elprisenligenu.dk/api/v1/prices/${selectedYear}/${selectedMonth}-${selectedDay}_${priceEast}.json`;
  HistorikEast(selectedUrl);
});


async function HistorikEast(url) {

    //opret elementer til oversigt med opdaterede priser for hver time
  const container = document.getElementById("historik-container");

  let { dataEast, error } = await getData(url);
  console.log(dataEast);

  // Opdater HTML-elementerne med priserne
  for (let i = 0; i < dataEast.length; i++) {
    const timeBox = document.createElement("div");
    timeBox.classList.add("time-box");

    const timeElement = document.createElement("div");
    timeElement.classList.add(`time${i}`, "time");
    timeElement.textContent = formatTime(i);

    const prisElement = document.createElement("div");
    prisElement.id = `pris${i}`;
    prisElement.classList.add("pris");

    timeBox.appendChild(timeElement);
    timeBox.appendChild(prisElement);

    container.appendChild(timeBox);

    const oversigtPrisElement = document.getElementById(`pris${i}`);
    oversigtPrisElement.innerHTML = dataEast[i].DKK_per_kWh.toFixed(3);
  }
}

// finder den aktuelle dato og tid og indstiller timen til xx.00
function formatTime(hour) {
  const time = new Date();
  time.setHours(hour, 0, 0); // Set minutes and seconds to 0
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

