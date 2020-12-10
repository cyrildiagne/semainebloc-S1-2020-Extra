const API = "https://api.waqi.info/feed/";
const KEY = "90a7b7283757123e1b6f4bee7f6abb24e8823990";

window.addEventListener("click", function () {

  init();

  function init() {
    let cityName = getCityName();
    console.log("City searched", cityName);
    if(!cityName)
      return;

      fetch(API + cityName + "/?token=" + KEY)
      .then((response) => response.json())
      .then((result) => console.log(result.data.aqi))
  }
});

function getCityName() {
  let url = window.location.search;
  let searchParams = new URLSearchParams(url);
  let googleSearch = searchParams.get('q');

  // console.log(googleSearch);
  return googleSearch;
}
