import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import UserService from "../../../services/user/user.service";
import { GetUserResponse } from "./types";

class UserController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await UserService.getById(new Types.ObjectId(id));

      const result: GetUserResponse = { user };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
