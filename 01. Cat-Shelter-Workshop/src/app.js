const express = require("express");
const handlebars = require("express-handlebars");

const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("it works");
});

app.listen(port, () => console.log(`App listening on port ${port}...`));
