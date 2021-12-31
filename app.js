// Express set-up
const express = require("express");
const app = express();
const path = require('path');

// static assets
app.use(express.static('public'));
app.use(express.static('Assets'));

// set up EJS + Views folder & path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// set up port listening
app.listen(8080, () => {
    console.log("Listening on port 8080!")
})

// routes
app.get('/index.ejs', (req, res) => {
    console.log('Home page request');
    res.render('index.ejs');
})

app.get('/shoppingBag.ejs', (req, res) => {
    res.render('shoppingBag.ejs');
})

app.get('/:product', (req, res) => {
    const product = req.params.product;
    res.render('productPage.ejs', {product});
})
