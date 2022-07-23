const url = require("url");
const fs = require("fs/promises");
const cats = require("../data/cats.json");

const catTemplate = (cat) => `
<li>
    <img src="${cat.imageUrl}" alt="Black Cat">
    <h3>${cat.name}</h3>
    <p><span>Breed: </span>${cat.breed}</p>
    <p><span>Description: </span>${cat.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="/edit">Change Info</a></li>
        <li class="btn delete"><a href="/">New Home</a></li>
    </ul>
</li>
`;

const homePage = async (req, res) => {
  const pathname = url.parse(req.url).pathname;

  console.log(pathname);

  if (pathname == "/" && req.method == "GET") {
    const homePage = await fs.readFile("./views/home/index.html", {
      encoding: "utf-8",
    });

    const result = homePage.replace(
      "{{cats}}",
      cats.map((c) => catTemplate(c))
    );

    console.log(result);

    res.write(result);
  }
};

exports.homePage = homePage;
