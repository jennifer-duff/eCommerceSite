// Express set-up
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

//cookies setup
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Monogoose setup
const mongoose = require('mongoose');
const Product = require('./product');
const { all } = require('express/lib/application');
// const methodOverride = require('method-override');

mongoose.connect(`mongodb://localhost:27017/Luma`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(error => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(error)
    })
;

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
app.get('/',  (req, res) => {
    res.render('index');
})

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

app.get('/category/:productCategory', async (req, res) => {
    const searchedCategory = req.params.productCategory;
    const filteredProducts = await Product.find({category: searchedCategory});
    pageTitle = searchedCategory;
    if (pageTitle === 'pantsAndDresses'){
        pageTitle = 'Pants & Dresses'
    }
    else{
        pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
    }
    console.log(pageTitle);
    res.render('categoryPage', {pageTitle, filteredProducts});
})

app.get('/products', async (req, res) => {
    const allProducts = await Product.find({});
    // console.log(allProducts);
    res.render('allProducts', {allProducts});
})

app.get('/products/:product', async (req, res) => {
    const productName = req.params.product;
    const product = await Product.findOne({name: productName});
    pageTitle = product.category;
    if (pageTitle === 'pantsAndDresses'){
        pageTitle = 'Pants & Dresses'
    }
    else{
        pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
    }
    // console.log(product);
    res.render('productPage', {product, pageTitle});
})

app.get('/about', async (req, res) => {
    res.render('aboutPage');
})

app.get('/contact', async (req, res) => {
    res.render('contactPage');
})

app.get('/contact_thankyou', async (req, res) => {
    res.render('contact_thankyou');
})

app.get('/search/q=:query', async (req, res) => {
    let query = req.params.query;
    query = query.trim();

    regEx = new RegExp(`.*${query}.*`, 'i')
    allResults = await Product.find({
        $or: [{name: regEx}, {keywords: regEx}]
    });

    // console.log(allResults);

    res.render('searchResults', {query, allResults});
})