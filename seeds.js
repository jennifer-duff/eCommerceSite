const mongoose = require('mongoose');
const { db } = require('./product');
const Product = require('./product');

//DEVELOPMENT DB:
// mongoose.connect(`mongodb://localhost:27017/Luma`, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(error => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(error)
//     })
// ;

const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.PROD_DB_CONNECTION);

//PRODUCTION DB:
mongoose.connect(process.env.PROD_DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
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
        category: 'outerwear',
        imgs: {
            img1: "/Assets/productImgs/blackBlazer/blackBlazer1.jpg",
            img2: "/Assets/productImgs/blackBlazer/blackBlazer2.jpg",
            img3: "/Assets/productImgs/blackBlazer/blackBlazer3.jpg"
        },
        keywords: ['outerwear', 'jackets', 'coats', 'office', 'professional'] 
    },
    {
        name: 'The Blue Peacoat',
        price: 85.99,
        category: 'outerwear',
        imgs: {
            img1: "/Assets/productImgs/bluePeacoat/bluePeacoat1.jpg",
            img2: "/Assets/productImgs/bluePeacoat/bluePeacoat2.jpg",
            img3: "/Assets/productImgs/bluePeacoat/bluePeacoat3.jpg"
        },
        keywords: ['outerwear', 'jackets', 'coats'] 
    },
    {
        name: 'The Oversized Blazer',
        price: 65.99,
        category: 'outerwear',
        imgs: {
            img1: "/Assets/productImgs/oversizedBlazer/oversizedBlazer1.jpg",
            img2: "/Assets/productImgs/oversizedBlazer/oversizedBlazer2.jpg",
            img3: "/Assets/productImgs/oversizedBlazer/oversizedBlazer3.jpg"
        },
        keywords: ['outerwear', 'jackets', 'coats', 'office', 'professional'] 
    },
    {
        name: 'The Black Pumps',
        price: 50.99,
        category: 'shoes',
        imgs: {
            img1: "/Assets/productImgs/blackPumps/blackPumps1.jpg",
            img2: "/Assets/productImgs/blackPumps/blackPumps2.jpg",
            img3: "/Assets/productImgs/blackPumps/blackPumps3.jpg",

        },
        keywords: ['shoes', 'heels', 'high heels', 'stilletos']
    },
    {
        name: 'The Block-Heeled Booties',
        price: 53.99,
        category: 'shoes',
        imgs: {
            img1: "/Assets/productImgs/heeledBooties/heeledBooties1.jpg",
            img2: "/Assets/productImgs/heeledBooties/heeledBooties2.jpg",
            img3: "/Assets/productImgs/heeledBooties/heeledBooties3.jpg",

        },
        keywords: ['shoes', 'heels', 'boots']
    },
    {
        name: 'The Graphic T',
        price: 37.99,
        category: 'tops',
        imgs: {
            img1: "/Assets/productImgs/graphicT/graphicT1.jpg",
            img2: "/Assets/productImgs/graphicT/graphicT2.jpg",
            img3: "/Assets/productImgs/graphicT/graphicT3.jpg",

        },
        keywords: ['tops', 'shirt', 't shirt', 't-shirt', 'tee shirt']
    },
    {
        name: 'The Lace Cami',
        price: 39.99,
        category: 'tops',
        imgs: {
            img1: "/Assets/productImgs/laceCami/laceCami1.jpg",
            img2: "/Assets/productImgs/laceCami/laceCami2.jpg",
            img3: "/Assets/productImgs/laceCami/laceCami3.jpg",

        },
        keywords: ['tops', 'shirt', 'camisole', 'undershirt']
    },
    {
        name: 'The Bowtie Blouse',
        price: 46.99,
        category: 'tops',
        imgs: {
            img1: "/Assets/productImgs/bowtieBlouse/bowtieBlouse1.jpg",
            img2: "/Assets/productImgs/bowtieBlouse/bowtieBlouse2.jpg",
            img3: "/Assets/productImgs/bowtieBlouse/bowtieBlouse3.jpg",

        },
        keywords: ['tops', 'shirt', 'blouson', 'chemise']

    },
    {
        name: 'The Tailored Trousers',
        price: 65.99,
        category: 'pantsAndDresses',
        imgs: {
            img1: "/Assets/productImgs/tailoredTrousers/tailoredTrousers1.jpg",
            img2: "/Assets/productImgs/tailoredTrousers/tailoredTrousers2.jpg",
            img3: "/Assets/productImgs/tailoredTrousers/tailoredTrousers3.jpg",

        },
        keywords: ['pant', 'pants', 'trousers', 'slacks']
    },
    {
        name: 'The Checked Dress',
        price: 52.99,
        category: 'pantsAndDresses',
        imgs: {
            img1: "/Assets/productImgs/checkedDress/checkedDress1.jpg",
            img2: "/Assets/productImgs/checkedDress/checkedDress2.jpg",
            img3: "/Assets/productImgs/checkedDress/checkedDress3.jpg",

        },
        keywords: ['dress', 'dresses', 'skirt', 'skirts', 'gown', 'gowns']
    },
];

// Product.remove({}, async (res) => {
//     console.log(res)
// });

// Product.insertMany(allProducts)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })
// ;