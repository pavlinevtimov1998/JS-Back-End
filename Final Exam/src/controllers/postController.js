const router = require("express").Router();

const { isUser } = require("../middlewares/guards");
const postService = require("../services/postService");
const { errorMessages } = require("../utils/errorMessages");

router.get("/catalog", async (req, res) => {
  try {
    const posts = await postService.getAll();

    res.render("catalog", {
      title: "Catalog Page",
      posts,
    });
  } catch (err) {
    res.status(400).redirect("/404");
  }
});

router.get("/create", isUser(), (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

router.post("/create", isUser(), async (req, res) => {
  const body = req.body;
  const userId = req.user._id;

  try {
    await postService.create(body, userId);

    res.status(201).redirect("/posts/catalog");
  } catch (err) {
    const error = errorMessages(err);

    res.render("create", {
      title: "Create Page",
      error,
      body,
    });
  }
});

router.get("/details/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user?._id;

  try {
    const post = await postService.getOne(postId);

    post.followers = post.followList.map((user) => user.email).join(", ");

    if (userId) {
      post.user = true;
      post.isOwner = post._ownerId._id.toString() == userId;
      if (!post.isOwner) {
        if (post.followList.find((user) => user._id.toString() == userId)) {
          post.isFollowing = true;
        } else {
          post.isFollowing = false;
        }
      }
    }

    res.render("details", {
      title: "Details Page",
      post,
    });
  } catch (err) {
    res.status(400).redirect("/");
  }
});

router.get("/edit/:postId", isUser(), async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    const post = await postService.getOneForEditing(postId, userId);

    res.render("edit", {
      title: "Edit Page",
      post,
    });
  } catch (err) {
    res.status(401).redirect("/");
  }
});

router.post("/edit/:postId", async (req, res) => {
  const post = req.body;
  const postId = req.params.postId;

  try {
    await postService.edit(post, postId);

    res.status(200).redirect("/posts/details/" + postId);
  } catch (err) {
    const error = errorMessages(err);

    res.render("edit", {
      title: "Edit Page",
      post,
      error,
    });
  }
});

router.get("/delete/:postId", isUser(), async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    const post = await postService.deletePost(postId, userId);

    res.status(200).redirect("/posts/catalog");
  } catch (err) {
    res.status(401).redirect("/");
  }
});

router.get("/follow/:postId", isUser(), async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    await postService.follow(postId, userId);

    res.status(200).redirect("/posts/details/" + postId);
  } catch (err) {
    res.status(401).redirect("/");
  }
});

module.exports = router;
