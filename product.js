const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    imgs: {
        img1: String,
        img2: String,
        img3: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;




// const testProduct = new Product({
//     name: 'NEW test Product',
//     category: 'Tops',
//     imgSrc: 'Asets/luma_fullLogo.svg'
// });
// testProduct.save();
