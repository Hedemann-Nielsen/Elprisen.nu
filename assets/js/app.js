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

prisNu();

async function prisNu() {
    let { dataEast, error } = await getData(url);
    console.log(dataEast);  
    const prisenNu = document.getElementById('prisNu');
    prisenNu.innerHTML = dataEast[12].DKK_per_kWh.toFixed(3);
}




// function getData(priceEast) {
    
// fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceEast}.json`)
// .then((response) => response.json())
// .then((dataEast) => {
//     console.log(dataEast);

//   //prisen nu
//     const prisenNu = document.getElementById('prisNu');
//     prisenNu.innerHTML = dataEast[12].DKK_per_kWh;
//     console.log(dataEast[12].DKK_per_kWh[0].slice(0,4));
// })
// .catch((error) => {
//     console.error(error);
//   });
// };

// function getData(priceWest) {
    
//     fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceWest}.json`)
//     .then((response) => response.json())
//     .then((dataWest) => {
//         console.log(dataWest);
//       })
//     .catch((error) => {
//         console.error(error);
//       });
//     };
