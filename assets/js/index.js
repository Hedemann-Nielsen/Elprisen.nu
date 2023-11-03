import { getData } from "./controller.js";
const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1; 
let day = today.getDate();

if (day < 10) {
  day = '0' + day; 
} else {
  day = day;
}

const priceEast = 'DK2';
// const priceWest = "DK1"; skal bruges til at ændre prisen fra øst til vest 

const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceEast}.json`;
console.log(month);
// view til index.html

// timen lige nu
const timenNu = document.getElementById('tid');
const timenNuDesktop = document.getElementById('tidDesktop');

const currentHour = today.getHours();
const nextHour = today.getHours() + 1;
console.log(`${currentHour}:00 - ${nextHour}:00`);

timenNu.innerHTML = `${currentHour}:00 - ${nextHour}:00`;
timenNuDesktop.innerHTML = `${currentHour}:00 - ${nextHour}:00`;

// view for east til index siden

prisNuEast();

async function prisNuEast() {
    let { dataEast, error } = await getData(url);
    console.log(dataEast);  
    const priceNowEast = document.getElementById('prisNu');
    priceNowEast.innerHTML = dataEast[currentHour].DKK_per_kWh.toFixed(3);

    const priceNowEastDesktop = document.getElementById('prisNuDesktop');
    priceNowEastDesktop.innerHTML = dataEast[currentHour].DKK_per_kWh.toFixed(3);
    
}

summaryEast();
highAndLowtEast();

async function highAndLowtEast() {
  let { dataEast, error } = await getData(url);
  
  // Find højeste og laveste pris
  const prices = dataEast.map(item => item.DKK_per_kWh);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
 
  // Opdater HTML-elementerne med højeste og laveste pris
  const minDesktopPrice = document.getElementById('minimumPrice');
  minDesktopPrice.innerHTML = `${minPrice.toFixed(3)} KR`;
  const maxDesktopPrice = document.getElementById('maximumPrice');
  maxDesktopPrice.innerHTML = `${maxPrice.toFixed(3)} KR`;
}



async function summaryEast() {
  let { dataEast, error } = await getData(url);

  //opret elementer til oversigt med opdaterede priser for hver time
  const container = document.getElementById("oversigt-container");

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
  time.setHours(hour, 0, 0); 
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}




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
  const container = document.getElementById("historik-container");
  const hoursInDay = 24;
  let { dataEast, error } = await getData(url);

  // opret HTML elementer for historik
  for (let i = 0; i < hoursInDay; i++) {
    const timeBox = document.createElement("div");
    timeBox.classList.add("time-box");
    const timeElement = document.createElement("div");
    timeElement.classList.add(`time${i}`, "time");
    timeElement.textContent = HistoryformatTime(i);
    const prisElement = document.createElement("div");
    prisElement.id = `historyPris${i}`;
    prisElement.classList.add("historyPris");
    timeBox.appendChild(timeElement);
    timeBox.appendChild(prisElement);
    container.appendChild(timeBox);
  }

  // Update prices for each hour in the dataEast array
  for (let i = 0; i < dataEast.length; i++) {
    const oversigtPrisElement = document.getElementById(`historyPris${i}`);
    oversigtPrisElement.innerHTML = dataEast[i].DKK_per_kWh.toFixed(3);
  }
}

function HistoryformatTime(hour) {
  const time = new Date();
  time.setHours(hour, 0, 0);
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}



//service worker

if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}
