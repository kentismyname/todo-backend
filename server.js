const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '112318',
    database: 'todolistdb',
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

// CRUD routes
app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/todos', (req, res) => {
    const todo = req.body;
    db.query('INSERT INTO todos SET ?', todo, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...todo });
    });
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = req.body;
    db.query('UPDATE todos SET ? WHERE id = ?', [todo, id], (err) => {
        if (err) throw err;
        res.json({ id, ...todo });
    });
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', id, (err) => {
        if (err) throw err;
        res.json({ message: 'Todo deleted' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
