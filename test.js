let http = require("http");

let App = http.createServer(function (req, res) {
  if (req.url == "/") {
    res.end("response.");
  }

  if (req.url == "/about") {
    res.end("about.");
  } else {
    res.end("nothing");
  }
});
App.listen(3000);
