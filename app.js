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
app.get('/', (req, res) => {
    console.log('Home page request');
    res.render('index');
})

// app.get('/index.ejs', (req, res) => {
//     console.log('Home page request');
//     res.render('index');
// })

app.get('/shoppingBag', (req, res) => {
    res.render('shoppingBag');
})

app.get('/checkout_yourInfo', (req, res) => {
    res.render('checkout_yourInfo');
})

app.get('/:product', (req, res) => {
    const product = req.params.product;
    console.log(product);
    res.render('productPage', {product});
})

