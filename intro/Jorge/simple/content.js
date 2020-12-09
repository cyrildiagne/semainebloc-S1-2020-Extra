
console.log("hello from  fromcontent.js")

function getAirQuality({city, state, country}){
  var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

           fetch(
          'https://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=7021151e-c3e9-4030-8ea7-c0316bd18666', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
            }

function run(){
 const city = 'Sathon';
const state = 'Bangkok';
const country = 'Thailand';

getAirQuality({city, state, country});
}
run();