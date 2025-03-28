import { query, Request, Response } from "express";
import { Model, RootFilterQuery, UpdateQuery } from "mongoose";
import IEntity from "../models/entity";

class BaseController<T extends IEntity> {
  protected model: Model<T>;

  constructor(model: any) {
    this.model = model;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(req: Request, res: Response) {
    try {
      const filter: { [key: string]: any } = {};
      for (const field of this.getFilterFields()) {
        if (req.query[field]) filter[field] = req.query[field];
      }

      const items = await this.model
        .find(filter as RootFilterQuery<T>)
        .sort({ timestamp: -1 });
      res.send(items);
    } catch (error: any) {
      res.status(400).send(error);
    }
  }

  getFilterFields(): string[] {
    return [];
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const item = await this.model.findById(id);
      if (item != null) {
        res.send(item);
      } else {
        res.status(404).send("not found");
      }
    } catch (error: any) {
      res.status(400).send(error);
    }
  }

  async create(req: Request, res: Response) {
    const body = req.body;
    try {
      const item = await this.model.create(body);
      res.status(201).send(item);
    } catch (error: any) {
      if (error.code === 11000) {
        error = { message: "Duplicate Key" };
      }
      res.status(400).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const rs = await this.model.findByIdAndDelete(id);
      res.status(200).send(rs);
    } catch (error: any) {
      res.status(400).send(error);
    }
  }

  getUpdateFields(): string[] {
    return [];
  }

  async update(req: Request, res: Response) {
    const id: string = req.params.id;
    const updateBody: { [key: string]: any } = {};
    for (const field of this.getUpdateFields()) {
      if (req.body[field]) updateBody[field] = req.body[field];
    }

    updateBody["timestamp"] = new Date();
    try {
      const filter = { _id: id };

      const item = await this.model.findOneAndUpdate(
        filter,
        updateBody as UpdateQuery<T>,
        {
          new: true,
        }
      );

      if (item) {
        res.status(201).send(item);
      } else {
        res.status(404).send("not found");
      }
    } catch (error: any) {
      if (error.code === 11000) {
        error = { message: "Duplicate Key" };
      }
      res.status(400).send(error);
    }
  }
}

export default BaseController;
