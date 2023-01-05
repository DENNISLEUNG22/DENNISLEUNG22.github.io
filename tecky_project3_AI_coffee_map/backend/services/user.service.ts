import { UserModel } from "../models/user.model";
import { BaseService } from "./base.service";

export class UserService extends BaseService<UserModel> {
  getModel(id: number): UserModel {
    return new UserModel(this.knex, id);
  }

  async findByUsername(username: string) {
    return await this.find({ username });
  }
}
