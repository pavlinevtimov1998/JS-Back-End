const router = require("express").Router();

const postService = require("../services/postService");
const { isUser } = require("../middlewares/guards");

router.get("/", isUser(), async (req, res) => {
  const user = req.user;

  try {
    const [posts, followed] = await postService.profile(user);

    res.render("profile", {
      title: "Profile Page",
      posts,
      followed,
      created: posts.length,
      countFollowed: followed.length,
    });
  } catch (err) {
    res.status(400).redirect("/");
  }
});

module.exports = router;
