const express = require("express");
const cookieParser = require("cookie-parser");

const { initDB } = require("./config/database");
const { hbsConfig } = require("./config/hbs");
const { PORT, COOKIE_NAME } = require("./constants");
const routes = require("./routes");
const { isAuth } = require("./middlewares/isAuthMiddleware");

async function startServer() {
  const app = express();

  await initDB();

  hbsConfig(app);
  app.use("/static", express.static("src/public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(isAuth);

  app.use(routes);

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
}

startServer();
