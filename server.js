const express =require('express');
const server = express();
const axios =require('axios');
const hbs =require('hbs');
const x="hello X";
const bodyParser = require('body-parser');
const filemgr = require('./filemgr');

server.use(bodyParser.urlencoded( {extended: true} ));

server.set('view engine', 'hb');
hbs.registerPartials(__dirname + '/views/partial');

server.get('/',(req, res)=>{
  res.render('main.hbs');
});
server.get('/main',(req, res)=>{
  res.render('main.hbs');
});
server.get('/result',(req, res)=>{
    res.render('result.hbs');
});
server.get('/History',(req, res)=>{
    filemgr.getAllData().then((result)=>{
      res.render('History.hbs',result);
    }).catch((errorMessage)=>{
      console.log(errorMessage);
    });
});
server.post('/form',(req, res)=>{
    res.render('form.hbs');
});



server.post('/getweather',(req,res)=>{
  const addr =req.body.address;
  const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyDJfKPpzaHKGjanalWbZGkEUHu8LR9HNAg`;

  axios.get(locationReq).then((response) =>{
    console.log(response.data.results[0].formatted_address);
    const lat =response.data.results[0].geometry.location.lat;
    const lang =response.data.results[0].geometry.location.lng;
    const weatherReq = `https://api.darksky.net/forecast/960e054fe4089fc6ca4035f0bbaf87db/${lat},${lang}`;
    return axios.get(weatherReq);

  }).then((response)=>{

    console.log(response.data.currently.summary);
    console.log(((response.data.currently.temperature-32)*0.5556).toFixed(2));
    const temp =(((response.data.currently.temperature-32)*0.5556).toFixed(2));
    const tempstring = `${temp} celcius`;
    const weatherresult = {
      address:addr,
      summary:response.data.currently.summary,
      temperature: tempstring,
    };
    filemgr.saveData(weatherresult).then((result) => {
      res.render('result.hbs',weatherresult);
    }).catch((errorMessage)=> {
      console.log(errorMessage);
    });

  })
  .catch((error)=>{
    console.log(error);
  });
});

server.get('/about',(req, res)=>{
res.render('about.hbs',{
  datetime: new Date().toDateString(),
})
});
server.get('/form',(req, res)=>{
res.render('form.hbs',{

})
});

server.listen(3000, ()=>{
  console.log("Server Started at port 3000");
});
