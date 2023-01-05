
import { Knex } from 'knex';



export class CafeService {
    constructor(private knex: Knex) { }
    async cafeBrand(brand: string) {
        return this.knex.raw(`select shop.id, shop.name, address, start_time, end_time, tel  from coffee_content 
        join 
        coffee on coffee_content.coffee_id = coffee.id
        join
        bean on bean.id = coffee_content.bean_id
        join
        shop on shop.id = coffee.shop_id
        where brand = ?`

        ), [brand]
    }

}