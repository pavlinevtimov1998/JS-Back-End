const express = require("express");
const router = require("./routes");
const { initialazeDatabase } = require("./config/database");
const { handlebarsConfig } = require("./config/hbs");

const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: false }));

handlebarsConfig(app);

app.use(router);

initialazeDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Server listen on port ${port}...`));
  })
  .catch((err) => {
    console.log(err);
  });
