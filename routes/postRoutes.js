import { Router } from "express";
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
} from "../controllers/postsController.js";

const router = Router();
router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", createPost);

router.put("/:id", updatePost);

export default router;
