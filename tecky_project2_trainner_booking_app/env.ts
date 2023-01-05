import {Client} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // CLIENT_URL: process.env.CLIENT_URL,
    // // STRIPE_PRIVATE_KEY
});

client.connect();
