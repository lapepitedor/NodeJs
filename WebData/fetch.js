import http from "node:http";
import fetch from "node-fetch";
const graz = {
  lat: 47.076668,
  long: 15.421371,
};

const weatherServer = http.createServer((req, resp) => {
    let weatherString = "Ich habe keine Wetter-Infos";
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${graz.lat}&longitude=${graz.long}&current_weather=true`;
        
    
    fetch(weatherApiUrl)
      .then((r) => {
        return r.json();
      })
      .then((weatherObject) => {
        console.log(weatherObject.current_weather.temperature); // Afficher les données météorologiques dans la console
        weatherString =
          "Temperatur in Graz:" + weatherObject.current_weather.temperature;

        resp.write(weatherString);
        resp.end();
      });
});
weatherServer.listen(4500, () => {
  console.log("Server is listening on port 4500");
});
// Refresh document every 30 second
//<head><meta hhtp-equiv= "refresh" content="30"></head>