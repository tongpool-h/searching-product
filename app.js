const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'products',
    port:'3306'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { products: [], query: '' });
});

app.post('/search', (req, res) => {
    const query = req.body.query;
    const sql = `SELECT * FROM products WHERE name LIKE ? OR description LIKE ?`;
    db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) throw err;
        res.render('index', { products: results, query });
    });
});

// Add a new route to display the "Add Product" page
app.get('/add-product', (req, res) => {
    res.render('add-product');
});

// Add a POST route to handle form submission
app.post('/add-product', (req, res) => {
    const { name, description, price } = req.body;
    const sql = `INSERT INTO products (name, description, price) VALUES (?, ?, ?)`;
    db.query(sql, [name, description, price], (err, result) => {
        if (err) throw err;
        console.log('Product added:', result);
        res.redirect('/');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
