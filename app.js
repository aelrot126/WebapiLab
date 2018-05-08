const yargs = require('yargs');
const axios =require('axios');
const argv = yargs
.options('address')
.argv;

const addr=argv.address;

const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyDJfKPpzaHKGjanalWbZGkEUHu8LR9HNAg`;

axios.get(locationReq).then((response) =>{
  console.log(response.data.results[0].formatted_address);
  console.log(response.data.results[0].geometry.location.lat);
  console.log(response.data.results[0].geometry.location.lng);
})
.catch((error)=>{
  console.log(error);
});
