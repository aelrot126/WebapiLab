const {MongoClient} = require('mongodb');
const fs =MongoClient;
const database = 'mongodb://localhost:27017';
const saveData = (newdata) =>  {
  return new Promise((resolve, reject)=>{
    MongoClient.connect(database,{useNewUrlParser: true}, (err, client)=> {
      if (err){
        reject('unable to connect to mongodb');
      }

    console.log('Successfull connected to mongodb');
    const db = client.db('WeatherApp');

    db.collection('weathercollection').insertOne(newdata,(err ,result)=> {
      if(err){
        reject('Cannot inserted to mongodb');
      }
      resolve(result);
    });
    client.close();
  });
});
};

const getAllData = () =>{
  return new Promise((resolve,reject)=>{
    MongoClient.connect(database,{useNewUrlParser: true}, (err, client)=> {
      if (err){
        reject('unable to connect to mongodb');
      }
      resolve('Successfull connected to mongodb');
      const db = client.db('WeatherApp');
      db.collection('weathercollection').find().toArray().then((docs)=>{
        resolve(docs);
      },(err)=>{
        reject('unable to fetch docs');
      });

      client.close();
    });

  });
};

module.exports ={
  saveData,getAllData,
};
