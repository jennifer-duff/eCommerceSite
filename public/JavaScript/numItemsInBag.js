'use strict'

window.addEventListener('load', function(){
    let uberCookie = decodeURIComponent(document.cookie);
    let numBagItems = document.querySelector('#numBagItems');
    let totalItems = 0;

    // remove whitespace
    const regEx = new RegExp(/\s/g);
    uberCookie = uberCookie.replace(regEx,'');   

    let allCookies = uberCookie.split(';');
    //console.log(allCookies);
    
    if (allCookies[0] === ''){
        numBagItems.innerText = ' ';
    }
    else{
        for (let i = 0; i < allCookies.length; i++){
            let currCookie = allCookies[i];
            let qty = parseInt(currCookie.substring((currCookie.indexOf('=') + 1))); 
            totalItems += qty;            
        }
        numBagItems.innerText = totalItems;
    }    
})