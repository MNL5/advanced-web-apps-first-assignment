import { Router } from "express";
import postsController from "../controllers/postsController";
import { authMiddleware } from "../controllers/usersController";

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The Posts API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - breed
 *         - content
 *         - _id
 *         - userId
 *         - imageURL
 *         - likeBy
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         breed:
 *           type: string
 *           description: The animal breed the post is about
 *         content:
 *           type: string
 *           description: The content of the post
 *         userId:
 *           type: string
 *           description: The user id of the post
 *         imageURL:
 *           type: string
 *           description: The route to pull from the image of the post
 *         likeBy:
 *           type: string[]
 *           description: Array with all the users who liked the post
 *       example:
 *         _id: 245ggofwk44234r234r23f4
 *         breed: Golden Retriver
 *         content: My dog max is looking for new home.
 *         userId: 245ggofwk44234r234r23g2
 *         imageURL: http://180.180.170.170/files/2343435fewsc
 *         likeBy: []
 */
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts. If query params are added, it will filter base on the params.
 *     tags:
 *       - Posts
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: The user ID to filter by the posts
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */
router.get("/", postsController.getAll);

/**
 * @swagger
 * /posts:
 *   put:
 *     summary: Like or unlike a post based on the UserID
 *     description: Like or unlike a post based on the UserID
 *     tags:
 *       - Posts
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: The post after the like
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/like/:id", postsController.like);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieve a single post by its ID
 *     tags:
 *       - Posts
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: A single post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get("/:id", postsController.getById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               breed:
 *                 type: string
 *                 description: The title of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: The new post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", postsController.create);

/**
 * @swagger
 * /posts:
 *   put:
 *     summary: Update a post
 *     description: Uppdate a post
 *     tags:
 *       - Posts
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               breed:
 *                 type: string
 *                 description: The breed of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *     responses:
 *       201:
 *         description: The post after the update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/:id", postsController.update);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a single post by its ID
 *     tags:
 *       - Posts
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: The deleted post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", postsController.delete);

export default router;
