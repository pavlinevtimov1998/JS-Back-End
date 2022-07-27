const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./routes");

const mongoose = require("mongoose");

const database = async () => {
  await mongoose.connect("mongodb://localhost:27017/CatShelter");
};

database();

const port = 3000;
const app = express();

app.use("/public", express.static("public"));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(router);

// app.get("/cats/add-breed", (req, res) => {
//   res.render("addBreed");
// });

// app.get("/cats/add-cat", (req, res) => {
//   res.render("addCat");
// });

app.listen(port, () => console.log(`App listening on port ${port}...`));
