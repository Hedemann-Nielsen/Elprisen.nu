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


