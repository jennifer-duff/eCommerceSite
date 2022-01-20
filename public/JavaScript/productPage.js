'use strict'

// const { cookie } = require("express/lib/response");

// ------------- CAROUSEL -------------
let arrows = document.querySelectorAll('.scrollArrow');
let leftArrow = arrows[0];
let rightArrow = arrows[1];
let allImgs = document.querySelectorAll('.productImg');
let firstImg = allImgs[0];
let carousel = document.querySelector('#carousel');
let imgWidth //= parseFloat(window.getComputedStyle(firstImg).width);
let carouselLength = 525;

// set default min carousel width
carousel.style.width = carouselLength;

// check carousel length upon loading
window.addEventListener('load', function() {
    imgWidth = parseFloat(window.getComputedStyle(firstImg).width);
    carouselLength = imgWidth * allImgs.length;
})


// listen for window size changes, in case that changes the img's widths
window.addEventListener('resize', function() {
    imgWidth = parseFloat(window.getComputedStyle(firstImg).width);
    carouselLength = imgWidth * allImgs.length;
    console.log(carouselLength);
})


let clickCounter = 0;
function scrollToNext(){
    console.log('scrolling to next!');
    carousel.scrollBy({
        left: imgWidth, top: 0, behavior: 'smooth'
    });
    clickCounter ++;
}

function scrollToPrev(){
    console.log('scrolling to previous!');
    carousel.scrollBy({
        left: -imgWidth, top: 0, behavior: 'smooth'
    });
    clickCounter --;
}

carousel.style.minWidth = carouselLength;

rightArrow.addEventListener('click', scrollToNext);
leftArrow.addEventListener('click', scrollToPrev);


// ------------- ADD TO BAG -------------
const addToBag = document.querySelector('#addToBag');
const numBagItems = document.querySelector('#numBagItems');
const itemName = document.querySelector('#productName').innerText;
const sizes = document.querySelectorAll('input[name="size"]');


addToBag.addEventListener('click', function() {
    let uberCookie = decodeURIComponent(document.cookie);
    let totalItems = 0;
    let updated = false;
    let itemSize;

    // find which size is selected 
    for (let i = 0; i < sizes.length; i++){
        if (sizes[i].checked){
            itemSize = sizes[i].value;
       }
   }

    // if no size is selected, prompt the user to pick one
    if (itemSize === undefined){
        console.log('Please choose a size');
        return;
    }

    // remove whitespace and put cookies into array
    const regEx = new RegExp(/\s/g);
    uberCookie = uberCookie.replace(regEx,'');   
    let allCookies = uberCookie.split(';');


    // check if item/size combo already exists as a cookie - if so, update the qty
    if (allCookies[0] !== ''){
       for (let i = 0; i < allCookies.length; i++){
            let currCookie = allCookies[i];
            let currCookieName = currCookie.substring(0, (currCookie.indexOf('=')));
            // console.log(currCookieName);

            let currQty = parseInt(currCookie.substring((currCookie.indexOf(':') + 1))); 

            // let currSize = currCookie.substring(currCookie.indexOf('_') + 1, currCookie.indexOf('='));
            let itemVarName = itemName.replace(regEx,'');
            let itemNameAndSize = `${itemVarName}_${itemSize}`;
            // console.log(`currCookieName: ${currCookieName}     itemNameAndSize: ${itemNameAndSize}`);
            if (currCookieName === itemNameAndSize){
                currQty ++;
                document.cookie = `${itemName}_${itemSize}=qty:${currQty}; path=/`;
                updated = true;
            }
            totalItems += currQty;            
        } 
    }
    
    // if item/size combo is new, add a new cookie
    if (updated === false){
        document.cookie = `${itemName}_${itemSize}=qty:1; path=/`;
        totalItems++;
    }

    // update shopping bag icon w/ new total # of items in bag
    numBagItems.innerText = totalItems;
})