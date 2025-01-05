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

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
