const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const ObjectId=require('mongodb').ObjectId;
const path = require('path')
const app = express();
const uri =
  "mongodb+srv://navadasharan:sharan445@cluster1.pmgqtck.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyParser.json());

//bootstrap

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

//connecting to Mongodb
const client = new MongoClient(uri);
const dbname = "people";
const collectionName = "friends";
client.connect();

//Getting collection from mongodb
const database = client.db(dbname);
const collection = database.collection(collectionName);

//
app.get("/user/:name", (req, res) => {
  console.log(req.params);
  collection
    .find(req.params)
    .toArray()
    .then((results) => {
      console.log(results);
      res.contentType("application/json");
      res.send(JSON.stringify(results));
    });
});

//Routes to create,update and delete from mongodb
app
  .route("/users")
  .get((req, res) => {
    collection
      .find()
      .toArray()
      .then((results) => {
        console.log(results);
        res.contentType("application/json");
        res.send(JSON.stringify(results));
      });
  })
  .post((req, res) => {
    console.log(req.body);
    collection.insertOne(req.body).then((results) => {
      console.log(req.body);
      res.contentType("application/json");
      res.send(JSON.stringify(results));
    });
  })
  .put((req, res) => {
    console.log(req.body);
    collection
      .findOneAndUpdate(
        { _id:new ObjectId(req.body._id)},
        {
          $set: {
            name: req.body.name
          }
        },
        {
          upsert: false,
        }
      )
      .then((results) => {
        res.contentType("application/json");
        res.send({"status":true})
      })
  })
  .delete((req, res) => {
    console.log(req.body);
    collection.deleteOne({
      _id:new ObjectId(req.body._id)
    }).then(result=>{
      let boo=true;
      if(result.deletedCount==0){
        boo:false
      }
      res.send({"status":boo})
    }).catch(error=>console.log(error))
  });


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Setting port 8000 
app.listen(8000, () => {
  console.log("server ready...");
});

module.exports=app;