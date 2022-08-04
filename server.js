//node without express
/*
let http = require("http")
let app = http.createServer(function(req, res){
  res.end("hi")

  if (req.url =="/about") {
    res.edn("hi")
  }
})
app.listen(3000)

*/

let express = require("express");
let App = express();

let { MongoClient } = require("mongodb");
let db;

// use await because need to wait for anyname.connect() before db=client.db(). need to put them in async to use await
async function go() {
  //local mongodb
  /*let client = new MongoClient(
    "mongodb://root:root@localhost:27017/todoapp?&authSource=admin"
  );*/
  //cloud mongodb

  let client = new MongoClient(
    "mongodb+srv://root:root@cluster0.cmcfzql.mongodb.net/?retryWrites=true&w=majority"
  );

  await client.connect();
  db = client.db();
  App.listen(3000);
}

go();

// allow express to access user input (name)
App.use(express.urlencoded({ extended: false }));

// first arg is home page
App.get("/", function (req, res) {
  //read db
  //toArray() converts mongadb to readable array
  db.collection("items")
    .find()
    .toArray(function (err, items) {
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>NodePro</title>
      </head>
      <body>
          <h3>To Do List</h3>
      
          <form id="form" action="/create" method="POST">
              <input name="item" id="input" autocomplete="off"></input>
              <button class="btn btn-primary">submit</button>
          </form>
          <ul id="list">
          ${items
            .map(function (item) {
              return `
            <li>${item.text}</li>
            `;
            })
            .join("")}
          </ul>

      </body>
      </html>

  `);
    });
});

App.post("/create", function (req, res) {
  //create data
  db.collection("items").insertOne({ text: req.body.item }, function () {
    res.redirect("/");
  });
});
