import PostModel from "../models/postsModel";

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

export default {
  getAllPosts,
};