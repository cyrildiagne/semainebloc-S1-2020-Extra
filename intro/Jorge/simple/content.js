
console.log("hello from  fromcontent.js")
const API = 'https://api.airvisual.com/v2/city?city=';
const KEY = '7021151e-c3e9-4030-8ea7-c0316bd18666';

const city = 'Sathon';
const state = 'Bangkok';
const country = 'Thailand';

var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

           fetch(API + city + '&state=' + state + '&country=' + country + '&key=' + KEY, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
            



