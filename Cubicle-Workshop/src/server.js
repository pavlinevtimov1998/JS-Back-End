const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.send("it works");
});

app.listen(port, () => console.log(`Server listen on port ${port}...`));
