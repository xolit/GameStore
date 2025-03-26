require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');// Ensure node-fetch is installed if running in Node.js

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get('/login', (req, res) => {
    res.render('Login', { database: process.env.BACKEND_URL });
});

app.get('/signup', (req, res) => {
    res.render('Signup', { database: process.env.BACKEND_URL });
});

app.get('/', async (req, res) => {
    try {
        let response = await fetch(`${process.env.BACKEND_URL}/game`);
        let data = await response.json();
        res.render('Home', { database: process.env.BACKEND_URL, data: data });
    } catch (error) {
        console.error("Error fetching games:", error);
        res.render('Home', { database: process.env.BACKEND_URL, data: [] }); // Pass empty data on error
    }
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
