
<<<<<<< HEAD
const imgs = document.body.getElementsByTagName('img')
for (const img of imgs) {
    img.classList.add("custom-img")
}
=======
console.log("hello from  fromcontent.js")
const API = 'https://api.airvisual.com/v2/city?city=';
const KEY = '7021151e-c3e9-4030-8ea7-c0316bd18666';

const city = 'Sathon';
const state = 'Bangkok';
const country = 'Thailand';


function getAirQuality({city, state, country}){
  var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

           fetch(API + city + '&state=' + state + '&country=' + country + '&key=' + KEY, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
            }

function run(){


getAirQuality({city, state, country});
}
run();
>>>>>>> 7d7584bce02b4eae2889165fbcdef896921e305c
