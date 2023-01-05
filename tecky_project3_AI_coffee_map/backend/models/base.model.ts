import { Knex } from "knex";

export class BaseModel<T extends BaseModel<any>> {
  constructor(
    protected knex: Knex,
    public readonly table: string,
    public readonly id: number
  ) {}
  async save() {
    await this.knex(this.table).update(this).where({ id: this.id });
  }

  async update(partial: Partial<T>) {
    Object.assign(this, partial);
    await this.save();
  }

  async load() {
    let row = await this.knex(this.table).select("*").first();
    Object.assign(this, row);
  }

  async find(filter: Partial<T>) {
    let row = await this.knex(this.table).select("id").where(filter).first();
    return row;
  }
}
