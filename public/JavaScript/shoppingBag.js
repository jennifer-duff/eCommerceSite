'use strict'

// --------------- handle qty updates ---------------
let bagProductTiles = document.querySelectorAll('.bagProductTile');
let indivPriceBoxes = document.querySelectorAll('.price');
let indivPriceLabels = document.querySelectorAll('.priceLabel');
let itemNames = document.querySelectorAll('.productTitle');
let sizeSpans = document.querySelectorAll('.sizeSpan');
let totalSumField = document.querySelector('#totalSum');
let qtySelectors = document.querySelectorAll('.qtySelector');
let numBagItems = document.querySelector('#numBagItems');
const regEx = new RegExp(/\s/g);

function checkForBagItems(){
    //console.log('CHECKING FOR BAG ITEMS');
    let noItemsMsg = document.querySelector('#noItemsMsg');
    let takeALook = document.querySelector('#takeALook');
    let checkOutBox = document.querySelector('#checkOutBox');

    let uberCookie = decodeURIComponent(document.cookie);
    let allCookies = uberCookie.split(';');
    if (allCookies[0] === ''){
        checkOutBox.style.display = 'none';
        takeALook.style.display = 'block';
        noItemsMsg.style.display = 'block';
    }
    else{
        checkOutBox.style.display = 'flex';
        takeALook.style.display = 'none';
        noItemsMsg.style.display = 'none';
    }
}
window.addEventListener('load', checkForBagItems);
// console.log(decodeURIComponent(document.cookie));



function qtyUpdateListener(){
    let totalSum = 0;
    let totalNumItems = 0;
    let displayedTiles = [];
    for (let i = 0; i < bagProductTiles.length; i++){
        if (bagProductTiles[i].style.display !== 'none'){
            displayedTiles.push(bagProductTiles[i]);
        }
    }

    for (let i = 0; i < displayedTiles.length; i++){
        let currTile = displayedTiles[i];
        // get base price & new qty; multiply to get new cost. Update total cost along the way
        let baseprice = currTile.dataset.baseprice;
        let currQtySelector = displayedTiles[i].querySelector('.qtySelector');
        let itmQty = parseInt(currQtySelector.value);
        let cost = baseprice * itmQty;
        cost = parseFloat(cost.toFixed(2));
        let currPriceLabel = displayedTiles[i].querySelector('.priceLabel');
        currPriceLabel.innerText = cost;   // for individual boxes price labels

        totalSum += cost;                       // for sum total @ bottom of pg
        // console.log(`totalSum = ${totalSum}`);
        totalNumItems += itmQty;                // for shopping bag num items indicator in header

        // update cookie w/ new qty
        let itemName = displayedTiles[i].querySelector('.productTitle').innerText;
        itemName = itemName.replace(regEx,'');
        let itemSize = displayedTiles[i].querySelector('.sizeSpan').innerText;
        let cookieName = `${itemName}_${itemSize}`;
        // console.log(cookieName);
        document.cookie = `${cookieName}=${itmQty}; path=/`;
    }
    totalSum = totalSum.toFixed(2);
    totalSumField.innerText = totalSum;
    numBagItems.innerText = totalNumItems;
}

for (let i = 0; i < qtySelectors.length; i++){
    qtySelectors[i].addEventListener('change', qtyUpdateListener);
}
window.addEventListener('load', qtyUpdateListener());



// --------------- handle deletion of bag items ---------------
let trashCans = document.querySelectorAll('.trashcanIcon');
let checkOutBox = document.querySelector('#checkOutBox');

function deleteBagItem(event){
    // get the parent div of the trashcan that was clicked
    let target = event.target;
    let parentDiv = target.closest('.bagProductTile');
    let qtySelector = parentDiv.querySelector('.qtySelector');

    // get the item name to be deleted and strip whitespace
    let itemName = parentDiv.dataset.itemname;
    itemName = itemName.replace(regEx,'');   

    // get item size
    let itemSize = parentDiv.dataset.itemsize;

    // put 'em together to create the cookie name
    let cookieName = `${itemName}_${itemSize}`;

    // update the shopping bag header icon
    let currTotalItems = parseInt(numBagItems.innerText);
    // console.log(`BEFORE: numBagItems = ${currTotalItems}`);

    // let itemQty = parseInt(parentDiv.dataset.itemqty);
    let itemQty = parseInt(qtySelector.value);
    // console.log(`itemQty = ${itemQty}`);
    let newTotalItems = currTotalItems - itemQty;
    // console.log(`AFTER:  numBagItems = ${newTotalItems}`);

    if (newTotalItems > 0){
        numBagItems.innerText = `${newTotalItems}`;
    }
    else{
        numBagItems.innerText = '';
    }


    // get the item baseprice + qty, then decrement/update Total Price
    let baseprice = parentDiv.dataset.baseprice;
    let cost = baseprice * itemQty;
    // console.log(`cost of deleted items = ${cost}`);
    let totalSum = parseFloat(totalSumField.innerText);
    // console.log(`totalSum BEFORE = ${totalSum}`);
    totalSum = totalSum - cost;
    // console.log(`totalSum AFTER  = ${totalSum}`);
    totalSumField.innerText = totalSum.toFixed(2);

    // set the cookie to expire in the past (aka, delete the cookie)
    document.cookie = `${cookieName}=0; path=/; expires = 01 Jan 1970 00:00:00 UTC`;
    // console.log(decodeURIComponent(document.cookie));


    // hide the div with the deleted item's data
    parentDiv.style.display = 'none';

    // if there's no more items in the bag, hide the checkOutBox
    checkForBagItems();
}

for (let i = 0; i < trashCans.length; i++){
    trashCans[i].addEventListener('click', deleteBagItem);
}
