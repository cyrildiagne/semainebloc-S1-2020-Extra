const API = "https://api.waqi.info/feed/";
const KEY = "90a7b7283757123e1b6f4bee7f6abb24e8823990";

const container = document.createElement('div');
container.id = 'particles-js';
document.body.appendChild(container);

 init();

  function init() {
    let cityName = getCityName();
    console.log("City searched", cityName);
    if(!cityName)
      return;


      fetch(API + cityName + "/?token=" + KEY)
      .then((response) => response.json())
      //.then((result) => console.log(result.data.aqi))
      .then((result) => {
        if(result.data.aqi > 0 && result.data.aqi < 50){
          console.log('it is between 0 and 50') 
          console.log(result.data.aqi)
          document.documentElement.style.setProperty('--blur', '0.2px');
          document.documentElement.style.setProperty('--color', (0, 0, 0));
          document.documentElement.style.setProperty('--background-color', (0,0,0));
          document.documentElement.style.setProperty('--grayscale', (0));
          particlesJS('particles-js', particlesSettings4);
          

        } else if (result.data.aqi > 50 && result.data.aqi < 100) {
          console.log('it is between 50 and 100')
          console.log(result.data.aqi)
          document.documentElement.style.setProperty('--blur', '1px');
          document.documentElement.style.setProperty('--color', (0, 0, 0));
          document.documentElement.style.setProperty('--background-color', (0,0,0));
          document.documentElement.style.setProperty('--grayscale', (30));
          particlesJS('particles-js', particlesSettings2);

        } else if (result.data.aqi > 100 && result.data.aqi < 200) {
          console.log('it is between 100 and 200')
          console.log(result.data.aqi)
          document.documentElement.style.setProperty('--blur', '2px');
          document.documentElement.style.setProperty('--color', (0, 0, 0));
          document.documentElement.style.setProperty('--background-color', (0,0,0));
          document.documentElement.style.setProperty('--grayscale', (70));
          particlesJS('particles-js', particlesSettings3);
          

        } else if (result.data.aqi > 200 && result.data.aqi < 300) {
          console.log('it is between 200 and 300')
          console.log(result.data.aqi)
          document.documentElement.style.setProperty('--blur', '5px');
          document.documentElement.style.setProperty('--color', (0, 0, 0));
          document.documentElement.style.setProperty('--background-color', (0,0,0));
          document.documentElement.style.setProperty('--grayscale', (100));
          particlesJS('particles-js', particlesSettings4);
          
        }
        })
      }

function getCityName() {
  let url = window.location.search;
  let searchParams = new URLSearchParams(url);
  let googleSearch = searchParams.get('q');

  // console.log(googleSearch);
  return googleSearch;
}