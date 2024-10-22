import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT),
});

const closePool = async () => {
	await pool.end();
	console.log('Database pool closed');
};

pool.on('connect', () => {
	console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
});

process.on('SIGINT', closePool);
process.on('SIGTERM', closePool);
