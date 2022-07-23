const http = require("http");
const fs = require("fs/promises");
const {homePage} = require("./handlers/home");
const port = 5000;

const server = http.createServer(async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  if (req.url == "/content/styles/site.css") {
    res.writeHead(200, {
      "Content-Type": "text/css",
    });

    const siteCSS = await fs.readFile("./content/styles/site.css", {
      encoding: "utf8",
    });

    res.write(siteCSS);
  } else if (req.url == "/add-cat") {
    const createCatPage = await fs.readFile("./views/addCat.html", {
      encoding: "utf-8",
    });

    res.write(createCatPage);
  } else if (req.url == "/add-breed") {
    const addBreedPage = await fs.readFile("./views/addBreed.html", {
      encoding: "utf-8",
    });

    res.write(addBreedPage);
  } else {
    await homePage(req, res)
  }

  res.end();
});

server.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
