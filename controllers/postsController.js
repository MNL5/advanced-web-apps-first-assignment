import PostModel from "../models/postsModel.js";

const getAllPosts = async (req, res) => {
  const sender = req.query.sender;

  try {
    const filter = {};
    if (sender) filter.sender = sender;
    const posts = await PostModel.find(filter);
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
  const postBody = req.body;

  try {
    const post = await PostModel.create(postBody);

    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    res.status(400).send("Post Id is missing");
  }

  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getAllPosts, createPost, getPostById };
