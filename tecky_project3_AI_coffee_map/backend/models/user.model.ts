import { Knex } from "knex";
import { BaseModel } from "./base.model";

export class UserModel extends BaseModel<UserModel> {
  username?: string;
  nickname?: string;
  password_hash?: string;

  constructor(knex: Knex, id: number) {
    super(knex, "user", id);
  }

  async rename(newName: string) {
    if (newName.length < 3) {
      throw new Error("invalid new name, should have at least 3 chars");
    }
    if (newName.length > 20) {
      throw new Error("invalid new name, should not excess 20 chars");
    }
    await this.update({ nickname: newName });
  }

  async checkPassword(password: string) {}
}
