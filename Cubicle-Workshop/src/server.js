const express = require("express");

const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.send("it works");
});

app.listen(port, () => console.log(`Server listen on port ${port}...`));
