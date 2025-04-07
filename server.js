import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 

const connectToDatabase = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST || 'smcyearbook.cdiagk8o8g4x.ap-southeast-1.rds.amazonaws.com',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'nR2Y72jQDfmT5MU',
        database: process.env.DB_NAME || 'smcyearbook',
    });
};

app.get('/api/alumni', async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM alumni');
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});