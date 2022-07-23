const http = require("http");
const fs = require("fs/promises");

const server = http.createServer(async (request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  if (request.url == "/content/styles/site.css") {
    response.writeHead(200, {
      "Content-Type": "text/css",
    });

    const siteCSS = await fs.readFile("./content/styles/site.css", {
      encoding: "utf8",
    });

    response.write(siteCSS);
  } else if (request.url == "/add-cat") {
    const createCatPage = await fs.readFile("./views/addCat.html", {
      encoding: "utf-8",
    });

    response.write(createCatPage);
  } else if (request.url == "/add-breed") {
    const addBreedPage = await fs.readFile("./views/addBreed.html", {
      encoding: "utf-8",
    });

    response.write(addBreedPage);
  } else {
    const homePage = await fs.readFile("./views/home/index.html", {
      encoding: "utf-8",
    });

    response.write(homePage);
  }

  response.end();
});

server.listen(5000, () => console.log("Server is listening on port 5000..."));
