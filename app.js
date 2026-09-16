const express = require('express');
const conn = require('./conn');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/registration', (req, res) => {
    const { idn, fn, mi, sn, gd, dob, pn, em, add, ct } = req.body;

    const insert = `INSERT INTO user_profile
        (idn, fn, mi, sn, gd, dob, pn, em, \`add\`, ct)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insert, [idn, fn, mi, sn, gd, dob, pn, em, add, ct], (err, result) => {
        if (err) {
            console.error('DB insert failed:', err.message);
            return res.status(500).send(`
                <script>
                    alert('Error saving data: ${err.code}');
                    location.href='/'
                </script>
            `);
        }
        console.log('Inserted row id:', result.insertId);
        res.send(`
            <script>
                alert('data inserted');
                location.href='/'
            </script>
        `);
    });
});
 
app.listen(9000, () => console.log('Server running on http://localhost:9000'));