import { Knex } from "knex";
import { BaseModel } from "../models/base.model";

export abstract class BaseService<T extends BaseModel<T>> {
  constructor(protected knex: Knex) {}

  abstract getModel(id: number): T;

  async get(id: number) {
    let model = this.getModel(id);
    await model.load();
    return model;
  }

  protected async find(filter: Partial<T>) {
    let row = await this.getModel(0).find(filter);
    if (row) {
      return this.getModel(row.id);
    }
    throw new Error("row not found");
  }
}
