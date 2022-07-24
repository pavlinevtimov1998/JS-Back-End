const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./routes");

const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(router);

app.listen(port, () => console.log(`Server listen on port ${port}...`));
