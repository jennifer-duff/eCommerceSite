const mongoose = require('mongoose');
const { db } = require('./product');
const Product = require('./product');


mongoose.connect(`mongodb://localhost:27017/Luma`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(error => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(error)
    })
;

const allProducts = [
    {
        name: 'The Black Blazer',
        price: 55.99,
        category: 'Outwear',
        imgSrc: "/Assets/productImgs/blackBlazer"
    },
    {
        name: 'The Blue Peacoat',
        price: 85.99,
        category: 'Outwear',
        imgSrc: "/Assets/productImgs/bluePeacoat"
    },
    {
        name: 'The Oversized Blazer',
        price: 65.99,
        category: 'Outwear',
        imgSrc: "/Assets/productImgs/oversizedBlazer"
    },
    {
        name: 'The Black Pumps',
        price: 50.99,
        category: 'Shoes',
        imgSrc: "/Assets/productImgs/blackPumps"
    },
    {
        name: 'The Block-Heeled Booties',
        price: 53.99,
        category: 'Shoes',
        imgSrc: "/Assets/productImgs/heeledBooties"
    },
    {
        name: 'The Graphic T',
        price: 37.99,
        category: 'Tops',
        imgSrc: "/Assets/productImgs/graphicT"
    },
    {
        name: 'The Lace Cami',
        price: 39.99,
        category: 'Tops',
        imgSrc: "/Assets/productImgs/laceCami"
    },
    {
        name: 'The Bowtie Blouse',
        price: 46.99,
        category: 'Tops',
        imgSrc: "/Assets/productImgs/graphicT"
    },
    {
        name: 'The Tailored Trousers',
        price: 65.99,
        category: 'Pants & Dresses',
        imgSrc: "/Assets/productImgs/tailoredTrousers"
    },
    {
        name: 'The Checked Dress',
        price: 52.99,
        category: 'Pants & Dresses',
        imgSrc: "/Assets/productImgs/checkedDress"
    },
];

// Product.remove({}, async (res) => {
//     console.log(res)
// });

Product.insertMany(allProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
;