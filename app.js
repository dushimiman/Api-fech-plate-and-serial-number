const express = require('express');
const mysql = require('mysql');


const app = express();


const db = mysql.createConnection({
    host: '127.0.0.1',   
    user: 'root',        
    password: '',
    database: 'maindb' 
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});


app.get('/api/devices', (req, res) => {
    const sqlQuery = 'SELECT plateNo, serialnumber FROM m_device';
    
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Database query failed' });
            return;
        }

        res.json({
            status: 'success',
            data: results
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
