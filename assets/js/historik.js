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
  let { dataEast, error } = await getData(url);
  console.log(dataEast);

  // Find den højeste og laveste pris i dataEast-arrayet
  const prices = dataEast.map(item => item.DKK_per_kWh);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const sum = maxPrice + minPrice;

  // Opdater HTML-elementerne med priserne
  for (let i = 0; i < dataEast.length; i++) {
    const prisElement = document.getElementById(`pris${i}`);
    prisElement.innerHTML = dataEast[i].DKK_per_kWh.toFixed(3);
  }

  console.log("Highest price:", maxPrice);
  console.log("Lowest price:", minPrice);
  console.log("Sum:", sum);
}
