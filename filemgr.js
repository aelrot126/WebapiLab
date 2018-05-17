// const {MongoClient} = require('mongodb');
//
// MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true}, (err, client)=> {
//   if (err){
//     return console.log('unable to connect to mongodb');
//   }
//   console.log('Successfull connected to mongodb');
//   const db = client.db('WeatherApp');
//
//   db.collection('weathercollection').insertOne({
//     address : 'Inti College',
//     summary : 'Cool and Windy',
//     temperature: '22 C',
//   },(err ,result)=> {
//     if(err){
//       return console.log('Cannot inserted to mongodb');
//     }
//     console.log(result);
//   })
//   client.close();
// });
const {MongoClient} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true}, (err, client)=> {
  if (err){
    return console.log('unable to connect to mongodb');
  }
  console.log('Successfull connected to mongodb');
  const db = client.db('WeatherApp');
  db.collection('weathercollection').find().toArray().then((docs)=>{
    console.log(JSON.stringify(docs));
  },(err)=>{
    console.log('unable to fetch docs');
  });


  client.close();
});
