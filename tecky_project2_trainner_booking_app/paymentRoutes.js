import express from "express";


import dotenv from 'dotenv';
dotenv.config();

export let paymentRoutes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 30000, name: "Selected Lesson" }],
]);

paymentRoutes.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/index.html`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})