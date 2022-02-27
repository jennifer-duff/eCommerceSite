// Express set-up
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

//cookies setup
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Monogoose setup
const mongoose = require('mongoose');
const Product = require('./product');
const { all } = require('express/lib/application');
const DB_URL = process.env.DB_URL || `mongodb://localhost:27017/Luma`;
// const methodOverride = require('method-override');

// Database connection
// mongodb+srv://tonkers:Luma4moi@ecommercecluster.5bz57.mongodb.net/Luma?retryWrites=true&w=majority
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.get('/shoppingBag', async (req, res) => {
    let uberCookie = req.cookies;
    let i = 1;
    let bagItems = [];

    for (let key of Object.keys(uberCookie)){
        let itemName = key.substring(0, key.indexOf('_'));
        let cleanedItemName = itemName.replace(/([A-Z])/g, ' $1').trim();
        if (cleanedItemName === 'The Block- Heeled Booties'){
            cleanedItemName = 'The Block-Heeled Booties';
        }

        let productInfo = await Product.findOne({name: cleanedItemName});

        let productImgs = productInfo.imgs;
        let productPrice = productInfo.price;
        let itemSize = key.substring(key.indexOf('_') + 1);
        let itemQty = uberCookie[key];

        let tempProduct = {
            name: cleanedItemName,
            imgs: productImgs,
            price: productPrice,
            size: itemSize,
            qty: itemQty
        };

        bagItems.push(tempProduct);
        i++
    }
    // console.log(bagItems);
    res.render('shoppingBag', {bagItems});
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
    res.render('categoryPage', {pageTitle, filteredProducts});
})

app.get('/allClothing', async (req, res) => {
    const allProducts = await Product.find({});
    // console.log(allProducts);
    res.render('allClothing', {allProducts});
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
    // console.log(product.name);
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