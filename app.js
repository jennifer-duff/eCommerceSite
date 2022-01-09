// Express set-up
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

// Monogoose setup
const mongoose = require('mongoose');
const Product = require('./product');
// const methodOverride = require('method-override');

mongoose.connect(`mongodb://localhost:27017/eCommerceApp`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(error => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(error)
    })
;

// const productSchema = new mongoose.Schema({
//     name: String,
//     category: String,
//     imgSrc: String
// });
// const Product = mongoose.model('Product', productSchema);

// const testProduct = new Product({
//     name: 'NEW test Product',
//     category: 'Tops',
//     imgSrc: 'Asets/luma_fullLogo.svg'
// });
// testProduct.save();


// static assets
app.use(express.static('public'));
app.use(express.static('Assets'));

// set up EJS + Views folder & path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// set up port listening
app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
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

app.get('/checkout_shipping', (req, res) => {
    res.render('checkout_shipping');
})

app.get('/checkout_payment', (req, res) => {
    res.render('checkout_payment');
})

app.get('/checkout_review', (req, res) => {
    res.render('checkout_review');
})

app.get('/checkout_thankyou', (req, res) => {
    res.render('checkout_thankyou');
})

app.get('/:product', (req, res) => {
    const product = req.params.product;
    console.log(product);
    res.render('productPage', {product});
})

