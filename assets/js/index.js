import { getData } from "./controller.js";
const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1; 
const day = today.getDate();

const priceEast = 'DK2';
// const priceWest = "DK1";

const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceEast}.json`;

// view til index.html

// timen lige nu
const timenNu = document.getElementById('tid');

const currentHour = today.getHours();
const nextHour = today.getHours() + 1;
console.log(`${currentHour}:00 - ${nextHour}:00`);

timenNu.innerHTML = `${currentHour}:00 - ${nextHour}:00`;


// view for east

prisNuEast();

async function prisNuEast() {
    let { dataEast, error } = await getData(url);
    console.log(dataEast);  
    const priceNowEast = document.getElementById('prisNu');
    priceNowEast.innerHTML = dataEast[currentHour].DKK_per_kWh.toFixed(3);
}



