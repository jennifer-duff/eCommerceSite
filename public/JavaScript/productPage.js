'use strict'

let arrows = document.querySelectorAll('.scrollArrow');
let leftArrow = arrows[0];
let rightArrow = arrows[1];
let allImgs = document.querySelectorAll('.productImg');
let firstImg = allImgs[0];
let carousel = document.querySelector('#carousel');
let imgWidth = parseFloat(window.getComputedStyle(firstImg).width);
let carouselLength = imgWidth * allImgs.length;

// listen for window size changes, in case that changes the img's widths
window.addEventListener('resize', function() {
    imgWidth = parseFloat(window.getComputedStyle(firstImg).width);
    carouselLength = imgWidth * allImgs.length;
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

carousel.style.width = carouselLength;

rightArrow.addEventListener('click', scrollToNext);
leftArrow.addEventListener('click', scrollToPrev);