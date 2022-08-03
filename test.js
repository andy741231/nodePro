let express = require("express");
let App = express();

// allow express to translate use input (name)
App.use(express.urlencoded({ extended: false }));

// first arg is home page
App.get("/", function (req, res) {
  res.send(`
  <form action="/anser" method="post">
    <p>color</p>
    <input name="color">
    <button>submit</button>
  </form>
  `);
});

App.post("/anser", function (req, res) {
  if (req.body.color == "a") {
    res.send(`
    <p>duhhhhh!</p>
    <a href="/">back</a>
    `);
  } else {
    res.send(`
    <p>nahhh!</p>
    <a href="/">back</a>
    `);
  }
});
App.listen(3000);
