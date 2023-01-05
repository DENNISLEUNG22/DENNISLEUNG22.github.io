import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("coffee_content").del();
    await knex("bean").del();
    await knex("coffee").del();



    // Inserts seed entries
    let coffeeIds = await knex("coffee").insert([
        { shop_id: 1, name: "Latte" },
        { shop_id: 2, name: "Cappuccino" },
        { shop_id: 3, name: "Americano" },
    ])
        .returning("id");

    console.log("coffeeIds:", coffeeIds);


    let beanIds = await knex("bean").insert([
        {
            brand: "Lavazza_Qualita_Oro"
        },
        {
            brand: "Lavazza_Qualita_Oro_Mountain_Grown"
        },
        {
            brand: "UCC_The_Blend_117"
        },
        {
            brand: "illy_Coffee_Classic_roast"
        },
        {
            brand: "illy_Coffee_Bold_Roast"
        },
        {
            brand: "Starbucks_Caffe_Latte"
        },
        {
            brand: "NO_DATA"
        },
        {
            brand: "Starbucks_Signature_Chocolate"
        },
        {
            brand: "Bushells_Coffee_Classic"
        },



    ])
        .returning("id");
    console.log("beanIdss:", beanIds);

    await knex("coffee_content").insert([
        { coffee_id: coffeeIds[0].id, bean_id: beanIds[0].id },
        { coffee_id: coffeeIds[1].id, bean_id: beanIds[1].id },

    ]);


};