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
// const priceWest = "DK1";

const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceEast}.json`;

// henter data til historik side for øst Danmark

oversigtEast();
async function oversigtEast() {
  let { dataEast, error } = await getData(url);
  
  // Find højeste og laveste pris
  const prices = dataEast.map(item => item.DKK_per_kWh);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  // Opdater HTML-elementerne med priserne
  for (let i = 0; i < dataEast.length; i++) {
    const prisElement = document.getElementById(`pris${i}`);
    prisElement.innerHTML = dataEast[i].DKK_per_kWh.toFixed(3);
  }
  
  // Opdater HTML-elementerne med højeste og laveste pris
  const minimumPrice = document.getElementById('minPrice');
  minimumPrice.innerHTML = `${minPrice.toFixed(3)} KR`;
  const maximumPrice = document.getElementById('maxPrice');
  maximumPrice.innerHTML = `${maxPrice.toFixed(3)} KR`;
}