require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

module.exports = { NODE_ENV, PORT, CORS_ORIGIN };
