require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

module.exports = { NODE_ENV, PORT, CORS_ORIGIN, MONGO_URI, JWT_SECRET, JWT_EXPIRE };
