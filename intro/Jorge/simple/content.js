console.log("hello from  fromcontent.js")

const imgs = document.body.getElementsByTagName('img')
for (const img of imgs) {
    img.classList.add("custom-img")
}

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
      
        fetch(
          'https://api.airvisual.com/v2/city?city=Lisbon&state=Lisbon&country=Portugal&key=7021151e-c3e9-4030-8ea7-c0316bd18666', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
    function run(){
      const city = 'Sathon';
      const state = 'Bangkok';
      const country = 'Thailand';
    
      getAirQuality({city, state, country});
    }
