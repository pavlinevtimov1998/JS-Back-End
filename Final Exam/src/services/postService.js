const Post = require("../models/Post");
const { error } = require("../utils/errorMessages");

exports.getSortedByDate = () =>
  Post.find().sort({ createdAt: -1 }).limit(3).lean();

exports.getAll = () => Post.find().lean();

exports.getOne = (id) =>
  Post.findById(id).populate("_ownerId").populate("followList").lean();

exports.create = (body, _ownerId) => {
  const post = {
    title: body.title,
    imageUrl: body.imageUrl,
    content: body.content,
    blogCategory: body.blogCategory,
    _ownerId,
  };

  return Post.create(post);
};

exports.getOneForEditing = async (postId, userId) => {
  const post = await Post.findById(postId).lean();

  if (post._ownerId.toString() != userId) {
    throw error("Unauthorized!");
  }

  return post;
};

exports.edit = async (body, id) => {
  const post = {
    title: body.title,
    imageUrl: body.imageUrl,
    content: body.content,
    blogCategory: body.blogCategory,
  };

  return Post.findByIdAndUpdate(id, post, { runValidators: true });
};

exports.deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (post._ownerId != userId) {
    throw error("Unauthorized!");
  }

  return Post.findByIdAndDelete(postId);
};

exports.follow = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (post.followList.find((id) => id == userId)) {
    throw error("You already followed this post!");
  }

  if (post._ownerId == userId) {
    throw error("Can't follow own post!");
  }

  return Post.findByIdAndUpdate(postId, { $push: { followList: userId } });
};

exports.profile =  (user) =>
  Promise.all([
    Post.find({ _ownerId: user._id }).lean(),
    Post.find({ followList: user._id }).lean(),
  ]);

// exports.getSortedByLikes = () =>
// Play.find({ isPublic: true }).sort({ countLikes: -1 });

// exports.likePlay = (playId, userId) =>
//   Play.findByIdAndUpdate(
//     playId,
//     { $push: { usersLikes: userId }, $inc: { countLikes: 1 } },
//     { new: true }
//   );
