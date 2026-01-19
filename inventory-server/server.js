require('dotenv').config(); // טעינת המשתנים מהקובץ .env
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// שימוש במשתני הסביבה
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) console.error('SQL Connection Error:', err);
    else console.log('מחובר ל-MySQL באמצעות משתני סביבה!');
});

// שאר הנתיבים (GET, POST, וכו') נשארים אותו דבר...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));