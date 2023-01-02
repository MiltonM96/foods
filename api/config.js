const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin';
const DB_HOST =  process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'food';
const API_KEY = process.env.API_KEY || 'd965f98d4a984c3f95e53cc1ed258050';
const PORT = process.env.PORT || 3001;

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    API_KEY,
    PORT,
}