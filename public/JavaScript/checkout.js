'use strict';

let backBtn = document.querySelector('#backLink');
let nextBtn = document.querySelector('#submitBtn');
let orderBtn = document.querySelector('#orderBtn');

let circles = document.querySelectorAll('.circle');
let mapLabels = document.querySelectorAll('.mapLabel');

function setMap(pageNum){
    for (let i = 0; i < circles.length; i++){
        if (i === pageNum){
            circles[i].style.backgroundColor = '#573047';
            mapLabels[i].style.fontWeight = '600';
        }
        else{
            circles[i].style.backgroundColor = 'none';
            mapLabels[i].style.fontWeight = '500';
        }
    }
    
}

window.addEventListener('load', () => {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let pageNum = undefined;

    if (page === 'checkout_yourInfo'){
        pageNum = 0;
    }
    else if (page === 'checkout_shipping'){
        pageNum = 1;
    }
    else if (page === 'checkout_payment'){
        pageNum = 2;
    }
    else if (page === 'checkout_review'){
        pageNum = 3;
    }
    setMap(pageNum);
})

orderBtn.addEventListener('click', () => {
    let uberCookie = decodeURIComponent(document.cookie);
    const regEx = new RegExp(/\s/g);
    uberCookie = uberCookie.replace(regEx,'');   

    let allCookies = uberCookie.split(';');
    for (let i = 0; i < allCookies.length; i++){
        // TODO: erase all cookies on click;
    }

})
