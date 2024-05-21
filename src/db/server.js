const express = require('express');
const db = require('./db');

const app = express();
const port = 3001;	// React의 포트 번호와 다르게 하기 위해

app.get('/', (req, res) => {
    db.query('SELECT * FROM test', function (err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});