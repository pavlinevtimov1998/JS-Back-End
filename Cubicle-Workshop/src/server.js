const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const { initialazeDatabase } = require("./config/database");
const { handlebarsConfig } = require("./config/hbs");
const { auth } = require("./middlewares/userMiddlewares");

const app = express();
const port = 3000;

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));
handlebarsConfig(app);
app.use(cookieParser());
app.use(auth);
app.use(router);

initialazeDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Server listen on port ${port}...`));
  })
  .catch((err) => {
    console.log(err);
  });
