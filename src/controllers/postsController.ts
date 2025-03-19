import { Request, Response } from "express";
import postModel, { IPost } from "../models/postsModel";
import BaseController from "./baseController";

class PostsController extends BaseController<IPost> {
  constructor() {
    super(postModel);

    this.like = this.like.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      req.body.userId = res.locals.userId;

      await super.create(req, res);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async like(req: Request, res: Response) {
    const postId: string = req.params.id;
    const userId: string = res.locals.userId;
    try {
      const item = await this.model.findById(postId);
      if (item?.likeBy.includes(userId)) {
        await this.model.findByIdAndUpdate(postId, {
          $pull: { likeBy: userId },
        }, { new: true });
      } else {
        await this.model.findByIdAndUpdate(postId, {
          $addToSet: { likeBy: userId },
        }, { new: true });
      }

      if (item) {
        res.status(200).send(item);
      } else {
        res.status(404).send("not found");
      }
    } catch (error: any) {
      if (error.code === 11000) {
        error = { message: "Duplicate Key" };
      }
      console.log(error);
      res.status(400).send(error);
    }
  }

  getFilterFields() {
    return ["userId"];
  }

  getUpdateFields() {
    return ["breed", "content", "imageURL"];
  }
}

export default new PostsController();
