import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MONGO_USERNAME = process.env.MONGO_USERNAME;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
