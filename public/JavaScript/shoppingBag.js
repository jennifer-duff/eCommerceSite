'use strict'

// --------------- handle qty updates ---------------
let indivPriceBoxes = document.querySelectorAll('.price');
let indivPriceLabels = document.querySelectorAll('.priceLabel');
let itemNames = document.querySelectorAll('.productTitle');
let sizeSpans = document.querySelectorAll('.sizeSpan');
let totalSumField = document.querySelector('#totalSum');
let qtySelectors = document.querySelectorAll('.qtySelector');
let numBagItems = document.querySelector('#numBagItems');
const regEx = new RegExp(/\s/g);


function qtyUpdateListener(){
    let totalSum = 0;
    let totalNumItems = 0;
    for (let i = 0; i < indivPriceBoxes.length; i++){
        // get base price & new qty; multiply to get new cost. Update total cost along the way
        let baseprice = indivPriceBoxes[i].dataset.baseprice;
        let itmQty = parseInt(qtySelectors[i].value);
        let cost = baseprice * itmQty;

        totalSum += cost;
        totalNumItems += itmQty;
        cost = cost.toFixed(2);
        indivPriceLabels[i].innerText = cost;

        // update cookie w/ new qty
        let itemName = itemNames[i].innerText;
        itemName = itemName.replace(regEx,'');
        let itemSize = sizeSpans[i].innerText;
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
console.log(decodeURIComponent(document.cookie));




// --------------- handle deletion of bag items ---------------
let trashCans = document.querySelectorAll('.trashcanIcon');
let checkOutBox = document.querySelector('#checkOutBox');

function deleteBagItem(event){
    // get the parent div of the trashcan that was clicked
    let target = event.target;
    let parentDiv = target.closest('.bagProductTile');

    // get the item name to be deleted and strip whitespace
    let itemName = parentDiv.dataset.itemname;
    itemName = itemName.replace(regEx,'');   

    // get item size
    let itemSize = parentDiv.dataset.itemsize;

    // put 'em together to create the cookie name
    let cookieName = `${itemName}_${itemSize}`;

    // update the shopping bag header icon
    let currTotalItems = parseInt(numBagItems.innerText);
    let itemQty = parseInt(parentDiv.dataset.itemqty);
    let newTotalItems = currTotalItems - itemQty;

    if (newTotalItems > 0){
        numBagItems.innerText = `${newTotalItems}`;
    }
    else{
        numBagItems.innerText = ``;
    }

    // get the item baseprice + qty, then decrement/update Total Price
    let baseprice = parentDiv.dataset.baseprice;
    let itmQty = parentDiv.dataset.itemqty;
    let cost = baseprice * itmQty;
    let totalSum = parseInt(totalSumField.innerText);
    totalSum = totalSum - cost;
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
