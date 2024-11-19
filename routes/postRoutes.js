import { Router } from "express";
import { getAllPosts } from "../controllers/postsController";

const router = Router();
router.get("/", getAllPosts);

export default router;