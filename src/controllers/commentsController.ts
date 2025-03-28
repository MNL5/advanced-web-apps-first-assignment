import commentsModel, { IComments } from "../models/commentsModel";
import { Request, Response } from "express";
import BaseController from "./baseController";
import postModel from "../models/postsModel";

class CommentsController extends BaseController<IComments> {
  constructor() {
    super(commentsModel);
  }

  async create(req: Request, res: Response) {
    try {
      if (req.body.postId) {
        if (!(await postModel.findById(req.body.postId))) {
          res.status(400).send("Post not found");
          return;
        }
      }

      req.body.userId = res.locals.userId;

      await super.create(req, res);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  getFilterFields() {
    return ["userId", "postId"];
  }

  getUpdateFields() {
    return ["content"];
  }
}

export default new CommentsController();
