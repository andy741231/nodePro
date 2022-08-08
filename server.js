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

let { MongoClient, ObjectId } = require("mongodb");
let db;

// make this foldeer available at root level
App.use(express.static("public"));

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
// allow express to access async input (text in browser.js)
// tells express to takes form data and added to body object which is in req object
App.use(express.json());

//password protected
App.use(password)

function password(req, res, next) {
  res.set('WWW-Authenticate', 'Basic realm="simple"')
  if(req.headers.authorization == "Basic YW5keToxMjMx"){
    next()
  }else{
    res.status(401).send("no")
  }
}
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
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
          <title>NodePro</title>
      </head>
      <body>
        <div class="container mt-5">
          <h3>To Do List</h3>

          <div class="my-5 card p-3" style="background-color: #f2f2f2;">
            <form id="form" action="/create-item" method="POST" class="row g-3">
                <div class="col-10">
                  <input class="form-control" autofocus name="item" id="input" autocomplete="off"></input>
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary">Add Item</button>
                </div>
            </form>
          </div>
          <div class="">
            <ul id="list" class="list-group mb-5">
            ${items
              .map(function (item) {
                return `
                <li class="list-group-item d-flex justify-content-between"><span class="item-text">${item.text}</span>
                  <div class="col-3">
                    <button class="btn btn-success edit" data-id="${item._id}">Edit</button><button data-id="${item._id}" class="btn btn-danger ms-3 delete">Delete</button>
                  </div>
                </li>                      
              `;
              })
              .join("")}
            </ul>
          </div>
        </div>

        <!--fetch framework from github axios-->
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="/browser.js"></script>
      </body>
      </html>

  `);
    });
});

App.post("/create-item", function (req, res) {
  //create data
  db.collection("items").insertOne({ text: req.body.text }, function (err, info) {
    res.json({_id: info.insertedId, text: req.body.text})
  });
});

App.post("/update-item", function (req, res) {
  //firt arg tells mongo which document (id value) to update
  db.collection("items").findOneAndUpdate(
    { _id: new ObjectId(req.body.id) },
    { $set: { text: req.body.text } },
    function () {}
  );
});

App.post("/delete-item", function(req, res) {
  db.collection("items").deleteOne(
    {_id: new ObjectId(req.body.id)},
    res.send("success")
  )
})