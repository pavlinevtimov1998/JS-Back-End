const router = require("express").Router();

const { Breed } = require("../models/Breeds");
const { Cat } = require("../models/Cats");

router.get("/:id", async (req, res) => {
  const cat = await Cat.findById(req.params.id);
  const breeds = await Breed.find().lean();

  res.render("editCat", {
    name: cat.name,
    description: cat.description,
    imageUrl: cat.imageUrl,
    breeds,
  });
});

// router.put("/", async (req, res) => {
//   const body = await req.body;

//   console.log(body);
// //   console.log(req.parsrams.id);  

//   res.redirect("/");
// });

module.exports = router;
