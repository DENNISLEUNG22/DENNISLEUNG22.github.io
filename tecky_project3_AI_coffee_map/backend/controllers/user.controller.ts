import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
  constructor(protected userService: UserService) {
    super();
  }

  login = async (req: Request, res: Response) => {
    let username = this.castString(req.body, "username");
    let password = this.castString(req.body, "password");

    let user = await this.userService.findByUsername(username);
    await user.checkPassword(password);
  };

  rename = async (req: Request, res: Response) => {
    let { user_id } = req.session;
    let newName = this.castString(req.body, "newName");

    let user = await this.userService.get(user_id);
    await user.rename(newName);
  };
}
