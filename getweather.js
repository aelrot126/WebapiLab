const yargs = require('yargs');
const axios =require('axios');
const argv = yargs
.options('address')
.argv;

const addr=argv.address;

const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyDJfKPpzaHKGjanalWbZGkEUHu8LR9HNAg`;

axios.get(locationReq).then((response) =>{
  console.log(response.data.results[0].formatted_address);
  const lat =response.data.results[0].geometry.location.lat;
  const lang =response.data.results[0].geometry.location.lng;
  const weatherReq = `https://api.darksky.net/forecast/960e054fe4089fc6ca4035f0bbaf87db/${lat},${lang}`;
  return axios.get(weatherReq);

}).then((response)=>{
  console.log(response.data.currently.summary);
  console.log(((response.data.currently.temperature-32)*0.5556).toFixed(2),"celcius");

})

.catch((error)=>{
  console.log(error);
});
