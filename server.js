const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var cors = require("cors");
var config = require("./config.json");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// HTTP, PORT
const port = 8001;
MongoClient.connect(config.url, (err, client) => {
  if (err) return console.log(err);
  require("./routes")(app, client);
  app.listen(process.env.PORT || port, () => {
    console.log("API SERVER  live on " + port);
  });
});
