const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', // הציבי את הסיסמה שלך כאן
    database: 'StoreDB'
});

db.connect(err => {
    if (err) console.error('SQL Connection Error:', err);
    else console.log('מחובר ל-MySQL בהצלחה!');
});

// שליפת כל המוצרים
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM Products', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// הוספת מוצר חדש
app.post('/api/products', (req, res) => {
    const { productName, category, price, stockQuantity } = req.body;
    const query = 'INSERT INTO Products (productName, category, price, stockQuantity) VALUES (?, ?, ?, ?)';
    db.query(query, [productName, category, price, stockQuantity], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
    });
});

// עדכון מוצר קיים
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { productName, category, price, stockQuantity } = req.body;
    const query = 'UPDATE Products SET productName=?, category=?, price=?, stockQuantity=? WHERE id=?';
    db.query(query, [productName, category, price, stockQuantity, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Product updated' });
    });
});

// מחיקת מוצר
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Products WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Product deleted' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));