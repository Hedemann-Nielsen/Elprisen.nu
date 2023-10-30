const today = new Date();


const year = today.getFullYear();
const month = today.getMonth() + 1; 
const day = today.getDate();

const priceEast = 'DK2';
const priceWest = "DK1";

getData(priceEast);
// getData(priceWest);

function getData(priceEast) {
    
fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceEast}.json`)
.then((response) => response.json())
.then((dataEast) => {
    console.log(dataEast);
  })
.catch((error) => {
    console.error(error);
  });
};

function getData(priceWest) {
    
    fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceWest}.json`)
    .then((response) => response.json())
    .then((dataWest) => {
        console.log(dataWest);
      })
    .catch((error) => {
        console.error(error);
      });
    };

    // view for east
    // const priceNow = document.getElementById('pris-nu');
    // const sunrise = document.querySelector(".sol-op");
    // priceNow.innerHTML = dataEast.daily.sunrise[0].split("T")[1];

// timen lige nu
const timenNu = document.getElementById('tid');

const currentHour = today.getHours();
const nextHour = today.getHours() + 1;
console.log(`${currentHour}:00 - ${nextHour}:00`);

timenNu.innerHTML = `${currentHour}:00 - ${nextHour}:00`;
