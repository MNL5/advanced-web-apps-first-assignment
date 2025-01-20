import { Router } from "express";
import postsController from "../controllers/postsController";

const router = Router();
router.get("/", postsController.getAll);

router.get("/:id", postsController.getById);

router.post("/", postsController.create);

router.put("/:id", postsController.update);

export default router;