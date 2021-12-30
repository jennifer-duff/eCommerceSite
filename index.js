const express = require("express");
const app = express();
const path = require('path');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.listen(8080, () => {
    console.log("Listening on port 8080!")
})

app.get('/', (req, res) => {
    console.log('Home page request');
    res.render('index.ejs');
})