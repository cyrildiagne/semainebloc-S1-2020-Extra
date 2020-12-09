const API = "https://api.airvisual.com/v2/city?city=";
const KEY = "7021151e-c3e9-4030-8ea7-c0316bd18666";

window.addEventListener("click", function () {

  init();

  // const city = "Sathon";
  // const state = "Bangkok";
  // const country = "Thailand";

  // const requestOptions = {
  //   method: "GET",
  //   redirect: "follow",
  // };

  // fetch(
  //   API + city + "&state=" + state + "&country=" + country + "&key=" + KEY,
  //   requestOptions
  // )
  //   .then((response) => response.json())
  //   .then((result) => console.log(result.data.current.pollution.aqius));
  // {
  //   if ((result) => result.data.current.pollution.aqius > 100) {
  //     console.log("yes");
  //   } else {
  //     console.log("no");
  //   }
  // }
});

function init() {
  let cityName = getCityName();
  console.log("City searched", cityName);
  if(!cityName)
    return;

  //FETCH
}

function getCityName() {
  let url = window.location.search;
  let searchParams = new URLSearchParams(url);
  let googleSearch = searchParams.get('q');

  // console.log(googleSearch);
  return googleSearch;
}
