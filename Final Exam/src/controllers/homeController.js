const router = require("express").Router();

const postService = require("../services/postService");

router.get("/", async (req, res) => {
  try {
    const posts = await postService.getSortedByDate();

    res.render("home", {
      title: "Home Page",
      posts,
    });
  } catch (err) {
    res.status(400).redirect("/404");
  }
});

module.exports = router;
